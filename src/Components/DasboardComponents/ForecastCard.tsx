import { View, Text, ActivityIndicator } from "react-native"
import { Satellite, Cloud, CloudSun, Sun, CloudRain} from "lucide-react-native";
import { useEffect, useState } from "react";
import { getForecasts } from "../../Services/api";
import { ClimateForecast } from "../../Types/ForecastType";

const weatherIcons = {
    "Ensolarado": <Sun size={40} color="#0000ff" />,
    "Nublado": <Cloud size={40} color="#0000ff" />,
    "Parcialmente Nublado": <CloudSun size={40} color="#0000ff" />,
    "Chuvoso": <CloudRain size={40} color="#0000ff" />,
};

export function ForecastCard() {
  const [forecast, setForecast] = useState<ClimateForecast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForecast() {
      try {
        const response = await getForecasts();
        if (response.content.length > 0) {
          // Pega a previsão mais recente (ou do dia atual)
          setForecast(response.content[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar previsão:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchForecast();
  }, []);

  if (loading) {
    return (
      <View className="bg-white rounded-2xl p-8 shadow-sm w-full items-center justify-center">
        <ActivityIndicator color="#0000ff" />
      </View>
    );
  }

  const condition = forecast && forecast.rainfallMm > 0 ? "Chuvoso" : "Ensolarado";

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm w-full">
        {/* header do card */}    
        <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-3">
                <Satellite size={20} color="#0000ff" />
                <Text className="text-md text-blue-700 font-bold mb-2">CLIMA · SATÉLITE </Text>
            </View>
            {/* Localização - Puxa da API */}
            <Text className="text-sm text-gray-500 mb-4">Sitío Boa Vista</Text>
        </View>
        
        {/* Corpo do card */}
        <View className="mb-2 flex-row items-center justify-between px-2">
            <View className="items-start">
                {/* Temperatura - Puxa da API */}
                <Text className="text-5xl font-bold">{forecast ? Math.round(forecast.maxTemp) : "--"}°C</Text>
                {/* Status do céu - Puxa da API */}
                <Text className="text-sm text-gray-500 ">{condition}</Text>
            </View>
            <View className="items-center bg-blue-300/40 rounded-2xl p-2 w-30 h-30">
                {/* Ícone do clima (Dinâmico) - Puxa da API */}
                <View className="items-center justify-center">
                    {weatherIcons[condition as keyof typeof weatherIcons]} 
                </View>
            </View>
        </View>

        <View className="my-2 border-b border-gray-200" />
        
        {/* Dados adicionais - Puxa da API */}
        <View className="flex-row items-center justify-between p-2">
            <View className="items-center">
                <Text className="text-sm text-gray-500">Mínima: </Text>
                <Text className="text-sm font-semibold">{forecast ? forecast.minTemp : "--"}°C</Text>
            </View>
            <View className="items-center">
                <Text className="text-sm text-gray-500">Chuva </Text>
                <Text className="text-sm font-semibold">{forecast ? forecast.rainfallMm : "--"}mm</Text>
            </View>
            <View className="items-center">
                <Text className="text-sm text-gray-500">Geada: </Text>
                <Text className="text-sm font-semibold">{forecast ? forecast.frostProb : "--"}%</Text>
            </View>
        </View>
    </View>
  )
}