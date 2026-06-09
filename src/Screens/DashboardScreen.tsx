import { Text, View, ScrollView } from "react-native";
//Importando Cards
import { ForecastCard } from "../Components/DasboardComponents/ForecastCard";
import { SoilMoisture } from "../Components/DasboardComponents/SoilMoisture";
import { RecentAlerts } from "../Components/DasboardComponents/RecentAlerts";

export function DashboardScreen() {
  return (
  <ScrollView showsVerticalScrollIndicator={false} >
    <View className="items-start justify-start w-full px-4 py-4">
        <Text className="text-lg text-gray-500">Resumo da sua propriedade hoje</Text>
    </View>
    <View className="flex-1 items-center justify-center px-4 gap-5 py-4">
      <ForecastCard />
      <SoilMoisture />
      <RecentAlerts  />
    </View>
  </ScrollView>
  );
}
