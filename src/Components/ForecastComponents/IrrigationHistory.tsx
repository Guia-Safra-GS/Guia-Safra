import React from 'react';
import { View, Text } from 'react-native';
import { RotateCcw } from 'lucide-react-native'; // Ícone similar ao da imagem

interface IrrigationLog {
  id: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  volume: number;
}

const mockLogs: IrrigationLog[] = [
  { id: '1', location: 'Horta Norte', date: 'Hoje', time: '06:12', duration: '6 min', volume: 12 },
  { id: '2', location: 'Canteiro Sul', date: 'Hoje', time: '05:40', duration: '8 min', volume: 18 },
  { id: '3', location: 'Pomar Leste', date: 'Ontem', time: '18:30', duration: '12 min', volume: 30 },
  { id: '4', location: 'Horta Norte', date: 'Ontem', time: '06:08', duration: '5 min', volume: 10 },
  { id: '5', location: 'Roça do Fundo', date: '27/05', time: '17:55', duration: '15 min', volume: 45 },
];

export function IrrigationHistory() {
  return (
    <View className="bg-white p-6 rounded-2xl mb-4 border border-slate-100 w-full max-w-md">
      
      {/* Header */}
      <View className="flex-row items-center gap-3 mb-4">
        <RotateCcw size={22} color="#166534" strokeWidth={2.5} />
        <Text className="text-lg font-bold text-green-800">
          Histórico de irrigação
        </Text>
      </View>

      {/* List */}
      <View>
        {mockLogs.map((item, index) => (
          <View 
            key={item.id} 
            className={`flex-row items-center justify-between py-4 ${index !== 0 ? 'border-t border-slate-50' : ''}`}
          >
            {/* Lado Esquerdo: Info */}
            <View>
              <Text className="text-slate-900 font-bold text-base">
                {item.location}
              </Text>
              <Text className="text-slate-400 text-sm mt-0.5">
                {item.date}, {item.time} · {item.duration}
              </Text>
            </View>

            {/* Lado Direito: Badge */}
            <View className="bg-green-50 px-4 py-2 rounded-xl">
              <Text className="text-green-800 font-bold text-sm">
                {item.volume} L
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};