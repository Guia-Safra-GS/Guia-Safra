import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Save, Droplets, Thermometer, ArrowLeft } from "lucide-react-native";
import { FetchSpeciesById, updateSpecies } from "../../Services/api";
import { Species } from "../../Types/BatchType";

interface EditFormWateringLimitsProps {
  speciesId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditFormWateringLimits({ speciesId, onSuccess, onCancel }: EditFormWateringLimitsProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [species, setSpecies] = useState<Species | null>(null);
  
  const [formData, setFormData] = useState({
    minHumidity: "",
    maxHumidity: "",
    wateringMl: "",
  });

  useEffect(() => {
    loadSpecies();
  }, [speciesId]);

  async function loadSpecies() {
    try {
      setLoading(true);
      const data = await FetchSpeciesById(speciesId);
      setSpecies(data);
      setFormData({
        minHumidity: data.minHumidity.toString(),
        maxHumidity: data.maxHumidity.toString(),
        wateringMl: data.wateringMl.toString(),
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados da espécie.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!species) return;

    const minH = parseFloat(formData.minHumidity);
    const maxH = parseFloat(formData.maxHumidity);
    const water = parseInt(formData.wateringMl);

    if (isNaN(minH) || isNaN(maxH) || isNaN(water)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      setSaving(true);
      await updateSpecies(speciesId, {
        commonName: species.commonName,
        scientificName: species.scientificName,
        minHumidity: minH,
        maxHumidity: maxH,
        frostMinTemp: species.frostMinTemp,
        wateringMl: water,
      });
      Alert.alert("Sucesso", "Limites de rega atualizados com sucesso!");
      onSuccess?.();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os limites.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-neutral-100">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-neutral-100"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={onCancel} className="mr-4">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">Limites de Rega</Text>
        </View>

        <View className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <Text className="text-gray-500 mb-6">
            Ajuste os parâmetros ideais de umidade para {species?.commonName}. 
            O sistema usará esses valores para acionar alertas e regas automáticas.
          </Text>

          <View className="mb-5">
            <View className="flex-row items-center mb-2">
              <Droplets size={18} color="#2563eb" className="mr-2" />
              <Text className="text-sm font-semibold text-gray-700">Umidade Mínima (%)</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              placeholder="Ex: 40"
              className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-xl px-4 text-neutral-900"
              value={formData.minHumidity}
              onChangeText={(text) => setFormData({ ...formData, minHumidity: text })}
            />
          </View>

          <View className="mb-5">
            <View className="flex-row items-center mb-2">
              <Droplets size={18} color="#1d4ed8" className="mr-2" />
              <Text className="text-sm font-semibold text-gray-700">Umidade Máxima (%)</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              placeholder="Ex: 80"
              className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-xl px-4 text-neutral-900"
              value={formData.maxHumidity}
              onChangeText={(text) => setFormData({ ...formData, maxHumidity: text })}
            />
          </View>

          <View className="mb-8">
            <View className="flex-row items-center mb-2">
              <Droplets size={18} color="#2563eb" className="mr-2" />
              <Text className="text-sm font-semibold text-gray-700">Volume de Rega (ml)</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              placeholder="Ex: 500"
              className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-xl px-4 text-neutral-900"
              value={formData.wateringMl}
              onChangeText={(text) => setFormData({ ...formData, wateringMl: text })}
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            className={`flex-row justify-center items-center h-14 rounded-xl ${saving ? 'bg-blue-400' : 'bg-blue-600'}`}
          >
            {saving ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Save size={20} color="white" className="mr-2" />
                <Text className="text-white text-lg font-bold">Salvar Alterações</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
