import { View, Text } from "react-native";
import { Droplets } from "lucide-react-native";
import ProgressBar from "./ProgressBar";

export function SoilMoisture() {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm w-full">
      <View className="flex-row items-center gap-2 mb-4">
        <Droplets size={20} color="#00d800" />
        <Text className="text-md font-medium text-green-600">
          UMIDADE MÉDIA DO SOLO
        </Text>
      </View>

      {/* Barra dinâmica - Puxa da Api */}
      <ProgressBar percentage={15} />

      {/* Alerta dinâmico - Puxa da Api */}
      <View className="mt-4 p-3 bg-red-100 rounded-3xl">
        <Text className="text-sm text-red-600">
          A umidade do solo está abaixo do ideal. Considere regar as plantas.
        </Text>
      </View>
    </View>
  );
}
