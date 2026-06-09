import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Save } from "lucide-react-native";
import { FetchSpecies, createSpecies, createBatch } from "../../Services/api";
import { Species } from "../../Types/BatchType";

interface FormData {
  name: string;
  type: string;
  sensorId: string;
}

export function RegisterNewBatchForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    sensorId: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    sensorId: "",
  });
  const [loading, setLoading] = useState(false);
  const [speciesList, setSpeciesList] = useState<Species[]>([]);

  useEffect(() => {
    loadSpecies();
  }, []);

  const loadSpecies = async () => {
    try {
      const data = await FetchSpecies();
      setSpeciesList(data);
    } catch (error) {
      console.error("Erro ao carregar espécies:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      type: "",
      sensorId: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Nome da área não pode ser vazio";
      isValid = false;
    }

    if (!formData.type.trim()) {
      newErrors.type = "Tipo de cultivo não pode ser vazio";
      isValid = false;
    }

    if (!formData.sensorId.trim()) {
      newErrors.sensorId = "ID do sensor não pode ser vazio";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 1. Verificar se a espécie já existe
      let species = speciesList.find(
        (s) => s.commonName.toLowerCase() === formData.type.toLowerCase()
      );

      // 2. Se não existir, criar uma nova
      if (!species) {
        species = await createSpecies({
          commonName: formData.type,
          scientificName: "",
          minHumidity: 40, // Default values
          maxHumidity: 80,
          frostMinTemp: 0,
          wateringMl: 500,
        });
      }

      // 3. Criar o lote (Slot)
      // Usamos o nome da área e sensor ID como 'position' no .NET
      const position = `${formData.name} (${formData.sensorId})`;
      const plantedAt = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      await createBatch({
        speciesId: species.id,
        position: position,
        plantedAt: plantedAt,
      });

      Alert.alert("Sucesso", "Lote cadastrado com sucesso!");
      setFormData({ name: "", type: "", sensorId: "" });
      loadSpecies(); // Atualiza a lista local
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o lote. Verifique a conexão com o servidor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-start bg-neutral-100 px-4 py-2"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="w-full p-3 items-start flex-col gap-3">
        <Text className="text-lg font-normal text-gray-500">
          Cadastre uma nova área de plantio e vincule o sensor IoT que fará o
          monitoramento
        </Text>
      </View>

      <View className="w-full p-5 items-start gap-3 bg-white rounded-3xl">
        <Text className="text-sm font-semibold text-gray-700">
          Nome da Área
        </Text>
        <TextInput
          placeholder=" Ex: Horta Norte"
          placeholderTextColor="#9ca3af"
          className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-lg px-4 text-neutral-900"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        {errors.name ? (
          <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
        ) : null}

        <Text className="text-sm font-semibold text-gray-700">
          Tipo de Cultivo
        </Text>
        <TextInput
          placeholder="Ex: Tomate, Milho..."
          placeholderTextColor="#9ca3af"
          className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-lg px-4 text-neutral-900"
          value={formData.type}
          onChangeText={(text) => setFormData({ ...formData, type: text })}
        />
        {errors.type ? (
          <Text className="text-red-500 text-xs mt-1">{errors.type}</Text>
        ) : null}

        <Text className="text-sm font-semibold text-gray-700">
          ID do Sensor
        </Text>
        <TextInput
          placeholder="Ex: ESP32-A1"
          placeholderTextColor="#9ca3af"
          className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-lg px-4 text-neutral-900"
          value={formData.sensorId}
          onChangeText={(text) => setFormData({ ...formData, sensorId: text })}
        />
        {errors.sensorId ? (
          <Text className="text-red-500 text-xs mt-1">{errors.sensorId}</Text>
        ) : null}

        {/* Botão de Salvar - enviará para a API */}
        <TouchableOpacity 
          className="bg-green-600 rounded-lg p-4 w-full items-center mt-5 flex-row justify-center gap-2" 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Save size={20} color="#ffffff" />
              <Text className="text-white text-lg font-semibold">
                Salvar Lote
              </Text>
            </>
          )}
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}
