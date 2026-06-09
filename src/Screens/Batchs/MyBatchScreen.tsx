import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import {
  RegistroFormulario,
  MyBatchCard,
} from "../../Components/MyBatchComponents/MyBatchCard";
import { MyBatchScreenProps } from "../../Types/types";
import { getReadings } from "../../Services/api";

export function MyBatchScreen({ navigation }: MyBatchScreenProps) {
  const [meusRegistros, setMeusRegistros] = useState<RegistroFormulario[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBatches = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      const response = await getReadings();
      
      // Agrupa as leituras por slot e pega a mais recente para cada um
      // Como a API retorna uma lista de leituras, filtramos para mostrar uma linha por Slot
      const uniqueSlots = response.content.reduce((acc: RegistroFormulario[], reading) => {
        if (!reading.slot) return acc;
        
        const existing = acc.find(item => item.id === String(reading.slot?.id));
        if (!existing) {
          acc.push({
            id: String(reading.slot.id),
            name: `Área ${reading.slot.position}`,
            type: "Monitoramento", // Species name not in summary
            sensorId: `IOT-${reading.slot.id}`,
            status: reading.slot.status === 'ACTIVE' ? 'Ativo' : reading.slot.status,
            humidity: Math.round(Number(reading.humidity))
          });
        }
        return acc;
      }, []);

      setMeusRegistros(uniqueSlots);
    } catch (error) {
      console.error("Erro ao carregar lotes:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBatches(true);
  }, []);

  useEffect(() => {
    fetchBatches();
  }, []);

  if (loading && !refreshing) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#16a34a" />
        <Text className="mt-4 text-gray-500 font-semibold">Carregando seus lotes...</Text>
      </View>
    );
  }

  return (
    <View className="px-4 absolute top-0 left-0 right-0 bottom-0 bg-gray-100 flex-1">
      <View className="p-3 flex-row justify-between items-center">
        <Text className="text-lg font-extrabold text-gray-500">
          {meusRegistros.length} {meusRegistros.length === 1 ? "área" : "áreas"}{" "}
          cadastradas
        </Text>
        <TouchableOpacity
          className="mt-2 bg-green-600 px-4 py-2 rounded-full self-start"
          onPress={() => navigation.navigate("NewBatchScreen")}
        >
          <Text className="text-white font-bold">+ Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meusRegistros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MyBatchCard dados={item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-10">
            Nenhum registro criado ainda.
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#16a34a"]} />
        }
      />
    </View>
  );
}