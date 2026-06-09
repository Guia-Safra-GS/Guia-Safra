import { View, Text, ActivityIndicator } from "react-native";
import { Droplets } from "lucide-react-native";
import { DashboardProgressBar } from "./DashboardProgressBar";
import { useEffect, useState } from "react";
import { getReadings } from "../../Services/api";

export function SoilMoisture() {
  const [avgHumidity, setAvgHumidity] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAverage() {
      try {
        const response = await getReadings();
        if (response.content.length > 0) {
          const sum = response.content.reduce((acc, curr) => acc + Number(curr.humidity), 0);
          setAvgHumidity(Math.round(sum / response.content.length));
        }
      } catch (error) {
        console.error("Erro ao carregar umidade:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAverage();
  }, []);

  if (loading) {
    return (
      <View className="bg-white rounded-2xl p-8 shadow-sm w-full items-center justify-center">
        <ActivityIndicator color="#16a34a" />
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm w-full">
      <View className="flex-row items-center gap-2 mb-4">
        <Droplets size={20} color="#00d800" />
        <Text className="text-md font-medium text-green-600">
          UMIDADE MÉDIA DO SOLO
        </Text>
      </View>

      {/* Barra dinâmica - Puxa da Api */}
      <DashboardProgressBar percentage={avgHumidity} />

      {/* Alerta dinâmico - Puxa da Api */}
      <View className={`mt-4 p-3 rounded-3xl ${avgHumidity < 20 ? 'bg-red-100' : 'bg-green-100'}`}>
        <Text className={`text-sm ${avgHumidity < 20 ? 'text-red-600' : 'text-green-600'}`}>
          {avgHumidity < 20 
            ? "A umidade do solo está abaixo do ideal. Considere regar as plantas."
            : "A umidade do solo está em níveis adequados."}
        </Text>
      </View>
    </View>
  );
}
