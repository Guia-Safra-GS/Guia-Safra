import { Text, View, ScrollView } from "react-native";
import { useAuth } from "../Context/AuthContext";

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

//Importando Cards
import { ForecastCard } from "../Components/DasboardComponents/ForecastCard";
import { SoilMoisture } from "../Components/DasboardComponents/SoilMoisture";
import { RecentAlerts } from "../Components/DasboardComponents/RecentAlerts";

export function DashboardScreen() {
  return (
  <ScrollView>
    <View className="flex-1 items-center justify-center px-4 gap-5 py-4">
      <View className="items-start justify-start w-full">
        <Text className="text-lg text-gray-500">Resumo da sua propriedade hoje</Text>
      </View>
      <ForecastCard />
      <SoilMoisture />
      <RecentAlerts  />
    </View>
  </ScrollView>
  );
}
