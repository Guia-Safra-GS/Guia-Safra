import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Droplets } from 'lucide-react-native';
import ProgressBar from './ForecastProgressBar';
import { getForecasts } from '../../Services/api';
import { ClimateForecast } from '../../Types/ForecastType';

export function RainProbability() {
  const [forecasts, setForecasts] = useState<ClimateForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForecastData() {
      try {
        const response = await getForecasts();
        // Ordena por data e pega os próximos 7 dias
        const sorted = response.content
          .sort((a, b) => new Date(a.forecastDate).getTime() - new Date(b.forecastDate).getTime())
          .slice(0, 7);
        setForecasts(sorted);
      } catch (error) {
        console.error("Erro ao carregar probabilidade de chuva:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchForecastData();
  }, []);

  const getDayLabel = (dateStr: string, index: number) => {
    if (index === 0) return "Hoje";
    const date = new Date(dateStr);
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getUTCDay()];
  };

  if (loading) {
    return (
      <View className="bg-white rounded-3xl p-8 items-center justify-center w-full mb-4">
        <ActivityIndicator color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm w-full overflow-hidden mb-4">
      
      {/* Cabeçalho */}
      <View className="flex-row items-center gap-2 mb-4 px-2">
        <Droplets color="#3b82f6" size={20} strokeWidth={2.5} />
        <Text className="text-lg font-bold text-gray-800">Probabilidade de chuva</Text>
      </View>

      {/* Lista de Dias */}
      <View className="px-2">
        {forecasts.length === 0 ? (
          <Text className="text-gray-400 text-center py-4">Sem dados de previsão</Text>
        ) : (
          forecasts.map((day, index) => {
            // Como não temos 'probabilidade de chuva' direta na ClimateForecast (temos frostProb), 
            // vamos estimar baseado na rainfallMm (se chuva > 0, chance alta) 
            // ou usar 0 se não houver chuva, apenas para fins de visualização do componente.
            // Nota: No schema real, rainfallMm é volume. Simularemos uma porcentagem visual.
            const probValue = day.rainfallMm > 0 ? Math.min(100, 30 + (day.rainfallMm * 5)) : 0;

            return (
              <View key={day.id || index} className="flex-row items-center gap-4 mb-3">
                <Text className="w-10 text-gray-500 font-medium text-sm">
                  {getDayLabel(day.forecastDate, index)}
                </Text>
                
                <ProgressBar percentage={probValue} />
                
                <Text className="w-10 text-right font-bold text-gray-800 text-sm">
                  {Math.round(probValue)}%
                </Text>
              </View>
            );
          })
        )}
      </View>

      {/* Insight da IA (Footer) */}
      <View className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 mt-2">
        <Text className="text-blue-700 font-medium text-sm leading-5">
          IA: {forecasts.some(f => f.rainfallMm > 10) 
            ? "Chuvas fortes previstas. Irrigação automática será ajustada." 
            : "Clima estável. Irrigação seguirá o cronograma padrão."}
        </Text>
      </View>
    </View>
  );
};