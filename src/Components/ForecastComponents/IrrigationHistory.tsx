import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { getWateringEvents, getSlots } from '../../Services/api';
import { WateringEvent, Batch } from '../../Types/BatchType';

export function IrrigationHistory() {
  const [logs, setLogs] = useState<{ id: string; location: string; date: string; time: string; volume: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [wateringRes, slots] = await Promise.all([
          getWateringEvents(),
          getSlots()
        ]);

        const mappedLogs = wateringRes.content.map(event => {
          const slot = slots ? slots.find(s => s.id === event.slotId) : null;
          
          // Tratamento defensivo para datas nulas ou inválidas
          let dateStr = "Data N/D";
          let timeStr = "--:--";
          
          if (event.eventTime) {
            const date = new Date(event.eventTime);
            if (!isNaN(date.getTime())) {
              dateStr = date.toLocaleDateString("pt-BR");
              timeStr = date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
            }
          }
          
          return {
            id: String(event.id || Math.random()),
            location: slot ? `Área ${slot.position}` : `Slot ${event.slotId || '?'}`,
            date: dateStr,
            time: timeStr,
            volume: event.volumeMl || 0
          };
        });

        setLogs(mappedLogs.slice(0, 5)); // Mostra os 5 últimos
      } catch (error) {
        console.error("Erro ao carregar histórico de irrigação:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="bg-white p-6 rounded-[32px] items-center justify-center w-full mb-4">
        <ActivityIndicator color="#166534" />
      </View>
    );
  }

  return (
    <View className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 w-full max-w-md mb-4">
      
      {/* Header */}
      <View className="flex-row items-center gap-3 mb-4">
        <RotateCcw size={22} color="#166534" strokeWidth={2.5} />
        <Text className="text-lg font-bold text-green-800">
          Histórico de irrigação
        </Text>
      </View>

      {/* List */}
      <View>
        {logs.length === 0 ? (
          <Text className="text-gray-400 text-center py-4">Nenhuma irrigação registrada</Text>
        ) : (
          logs.map((item, index) => (
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
                  {item.date}, {item.time}
                </Text>
              </View>

              {/* Lado Direito: Badge */}
              <View className="bg-green-50 px-4 py-2 rounded-xl">
                <Text className="text-green-800 font-bold text-sm">
                  {item.volume} ml
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};