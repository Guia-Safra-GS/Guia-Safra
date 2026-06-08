import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../Types/types";
import {
  TriangleAlert,
  Info,
  CircleCheck,
  ChevronRight,
} from "lucide-react-native";

export function RecentAlerts() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm w-full">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">
          Alertas Recentes
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("MyBatchScreen")}>
          <Text className="text-sm text-blue-600">Ver Todos</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-2">
        <View className="items-start gap-2 mb-2">
          <View className="flex-row items-center gap-2">
            <TriangleAlert color="#dec300" />
            <Text className="text-md font-bold text-gray-800">
              Roça do Fundo
            </Text>
            <View className="flex-1 items-end">
              <Text className="text-sm text-gray-500">Há 12 min</Text>
            </View>
          </View>
          <View className="mt-1">
            <Text className="text-sm text-neutral-600">
              Alerta: Umidade abaixo do limite (18%)
            </Text>
          </View>
          <View className="border-b border-gray-300 w-full" />
        </View>

        <View className="items-start gap-2 mb-2">
          <View className="flex-row items-center gap-2">
            <Info color="#0021da" />
            <Text className="text-md font-bold text-gray-800">
              Roça do Fundo
            </Text>
            <View className="flex-1 items-end">
              <Text className="text-sm text-gray-500">Há 30 min</Text>
            </View>
          </View>
          <View className="mt-1">
            <Text className="text-sm text-neutral-600">
              Irrigação automática adiada
            </Text>
          </View>
          <View className="border-b border-gray-300 w-full" />
        </View>

        <View className="items-start gap-2 mb-2">
          <View className="flex-row items-center gap-2">
            <CircleCheck color="#10b981" />
            <Text className="text-md font-bold text-gray-800">
              Roça do Fundo
            </Text>
            <View className="flex-1 items-end">
              <Text className="text-sm text-gray-500">Há 2 h</Text>
            </View>
          </View>
          <View className="mt-1">
            <Text className="text-sm text-neutral-600">
              Ciclo de rega concluído (6 min)
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row mt-4 p-3 border border-gray-300 rounded-full items-center justify-center"
          onPress={() => navigation.navigate("MyBatchScreen")}
        >
          <Text className="text-neutral-700 font-bold">Abrir meus lotes</Text>
          <ChevronRight size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
