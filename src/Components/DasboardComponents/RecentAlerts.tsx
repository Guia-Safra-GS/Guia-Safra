import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../Types/types";
import {
  TriangleAlert,
  Info,
  CircleCheck,
  ChevronRight,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { getAlerts } from "../../Services/api";
import { Alert } from "../../Types/BatchType";

export function RecentAlerts() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const response = await getAlerts(undefined, false); // Pegamos apenas alertas não resolvidos
        setAlerts(response.content.slice(0, 3)); // Mostramos apenas os 3 primeiros
      } catch (error) {
        console.error("Erro ao carregar alertas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <TriangleAlert color="#ef4444" />;
      case 'MEDIUM': return <TriangleAlert color="#dec300" />;
      default: return <Info color="#0021da" />;
    }
  };

  if (loading) {
    return (
      <View className="bg-white rounded-2xl p-8 shadow-sm w-full items-center justify-center">
        <ActivityIndicator color="#16a34a" />
      </View>
    );
  }

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
        {alerts.length === 0 ? (
          <View className="items-center py-4">
            <CircleCheck color="#10b981" size={30} />
            <Text className="text-gray-500 mt-2">Nenhum alerta pendente</Text>
          </View>
        ) : (
          alerts.map((alert, index) => (
            <View key={alert.id} className="items-start gap-2 mb-2">
              <View className="flex-row items-center gap-2">
                {getIcon(alert.severity)}
                <Text className="text-md font-bold text-gray-800">
                  Lote {alert.slotId}
                </Text>
                <View className="flex-1 items-end">
                  <Text className="text-sm text-gray-500">Recente</Text>
                </View>
              </View>
              <View className="mt-1">
                <Text className="text-sm text-neutral-600">
                  {alert.alertType}: {alert.message}
                </Text>
              </View>
              {index < alerts.length - 1 && <View className="border-b border-gray-300 w-full mt-2" />}
            </View>
          ))
        )}

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
