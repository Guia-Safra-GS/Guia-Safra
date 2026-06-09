import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

interface DashboardProgressBarProps {
  percentage: number; // Valor de 0 a 100
}

export function DashboardProgressBar({ percentage }: DashboardProgressBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false, // Necessário para animar o width
    }).start();
  }, [percentage]);

  return (
    <View className="w-full py-4" >
        <Text className="text-5xl font-bold text-gray-800">
            {percentage}%
        </Text>
      
      {/* Container da barra cinza (fundo) */}
      <View className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
        <Animated.View 
        className="h-full bg-green-600"
          style={[{ width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }) 
            }
          ]} 
        />
      </View>

      {/* Rótulos abaixo da barra */}
      <View className="flex-row justify-content mt-2 justify-between">
        <Text className="text-sm text-gray-500">Seco</Text>
        <Text className="text-sm text-gray-500">Ideal</Text>
        <Text className="text-sm text-gray-500">Saturado</Text>
      </View>
    </View>
  );
};