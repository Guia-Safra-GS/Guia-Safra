import React from 'react';
import { View } from 'react-native';

interface ForecastProgressBarProps {
  percentage: number;
}

export function ForecastProgressBar({ percentage }: ForecastProgressBarProps) {
  return (
    // Trilho da barra (Background)
    <View className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
      <View 
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }} 
      />
    </View>
  );
};

export default ForecastProgressBar;