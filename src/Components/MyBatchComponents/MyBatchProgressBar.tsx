import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

interface MyBatchProgressBarProps {
  percentage: number; // Valor de 0 a 100
}

export function MyBatchProgressBar({ percentage }: MyBatchProgressBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View
      className="bg-gray-200 rounded-full flex-1 overflow-hidden mx-3"
      style={{}}
    >
      <Animated.View
        style={{
          width: widthAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
          backgroundColor: "#2d8a3e",
          height: 8,
          borderRadius: 4,
        }}
      />
    </View>
  );
}
