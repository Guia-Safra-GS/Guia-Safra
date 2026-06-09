import React from 'react';
import { View, Text } from 'react-native';
import { Droplets } from 'lucide-react-native'; // O ícone da gota
import ProgressBar from './ForecastProgressBar';

interface DayProbability {
  label: string;
  value: number;
}

const weekData: DayProbability[] = [
  { label: 'Hoje', value: 10 },
  { label: 'Ter', value: 30 },
  { label: 'Qua', value: 80 },
  { label: 'Qui', value: 90 },
  { label: 'Sex', value: 40 },
  { label: 'Sáb', value: 5 },
  { label: 'Dom', value: 0 },
];

export function RainProbability() {
  return (
    <View className="bg-white p-6 rounded-2xl mb-4 w-full">
      
      {/* Cabeçalho */}
      <View className="flex-row items-center gap-3 mb-6">
        <Droplets color="#3b82f6" size={24} strokeWidth={2.5} />
        <Text className="text-xl font-bold text-slate-800">Probabilidade de chuva</Text>
      </View>

      {/* Lista de Dias */}
      <View>
        {weekData.map((day) => (
          <View key={day.label} className="flex-row items-center gap-4 mb-4">
            {/* Nome do dia */}
            <Text className="w-12 text-slate-500 font-medium text-base">
              {day.label}
            </Text>
            
            {/* Barra customizada */}
            <ProgressBar percentage={day.value} />
            
            {/* Valor numérico */}
            <Text className="w-10 text-right font-bold text-slate-800 text-base">
              {day.value}%
            </Text>
          </View>
        ))}
      </View>

      {/* Insight da IA (Footer) */}
      <View className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 mt-2">
        <Text className="text-blue-700 font-medium text-[15px] leading-5">
          IA: chuvas fortes previstas qua-qui. Irrigação automática será adiada.
        </Text>
      </View>
    </View>
  );
};