import { View, Text, ScrollView } from "react-native";
import { Sun, CloudRain, CloudSun, Cloud, CloudLightning, Satellite } from "lucide-react-native";

//puxar todas as informções climáticas da API - puxa da API

export function ForecastCarrouselCard() {
  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm w-full overflow-hidden mb-4">
        <View className="flex-row gap-2 items-start mb-4 px-2">
            <Satellite size={20} color="#3b82f6" />
            <Text className="text-lg font-bold text-blue-700 leading-5">
                Próximos 7 dias · satélite
            </Text>
        </View>
        
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="flex-grow justify-center gap-4 pb-2"
        >
            <View className="items-center bg-gray-200/60 rounded-2xl p-3 gap-1">
                <Text className="text-sm text-gray-500">Hoje</Text>
                <Sun size={24} color="#fbbf24" />
                <Text className="text-md font-bold text-gray-800">25°C</Text>
                <Text className="text-md text-gray-500">18°C</Text>
                <Text className="text-xs font-bold text-blue-800/80">10%</Text>
            </View>
            <View className="items-center bg-gray-200/60 rounded-2xl p-3 gap-1">
                <Text className="text-sm text-gray-500">Ter</Text>
                <CloudRain size={24} color="#3b82f6" />
                <Text className="text-md font-bold text-gray-800">22°C</Text>
                <Text className="text-md text-gray-500">16°C</Text>
                <Text className="text-xs font-bold text-blue-800/80">80%</Text>
            </View>
            <View className="items-center bg-gray-200/60 rounded-2xl p-3 gap-1">
                <Text className="text-sm text-gray-500">Qua</Text>
                <Cloud size={24} color="#6b7280" />
                <Text className="text-md font-bold text-gray-800">24°C</Text>
                <Text className="text-md text-gray-500">18°C</Text>
                <Text className="text-xs font-bold text-blue-800/80">20%</Text>
            </View>
            <View className="items-center bg-gray-200/60 rounded-2xl p-3 gap-1">
                <Text className="text-sm text-gray-500">Qui</Text>
                <CloudSun size={24} color="#fbbf24" />
                <Text className="text-md font-bold text-gray-800">26°C</Text>
                <Text className="text-md text-gray-500">20°C</Text>
                <Text className="text-xs font-bold text-blue-800/80">15%</Text>
            </View>
            <View className="items-center bg-gray-200/60 rounded-2xl p-3 gap-1">
                <Text className="text-sm text-gray-500">Sex</Text>
                <CloudLightning size={24} color="#ef4444" />
                <Text className="text-md font-bold text-gray-800">21°C</Text>
                <Text className="text-md text-gray-500">15°C</Text>
                <Text className="text-xs font-bold text-blue-800/80">90%</Text>
            </View>
            <View className="items-center bg-gray-200/60 rounded-2xl p-3 gap-1">
                <Text className="text-sm text-gray-500">Sáb</Text>
                <CloudLightning size={24} color="#ef4444" />
                <Text className="text-md font-bold text-gray-800">21°C</Text>
                <Text className="text-md text-gray-500">15°C</Text>
                <Text className="text-xs font-bold text-blue-800/80">90%</Text>
            </View>
            <View className="items-center bg-gray-200/60 rounded-2xl p-3 gap-1">
                <Text className="text-sm text-gray-500">Dom</Text>
                <CloudLightning size={24} color="#ef4444" />
                <Text className="text-md font-bold text-gray-800">21°C</Text>
                <Text className="text-md text-gray-500">15°C</Text>
                <Text className="text-xs font-bold text-blue-800/80">90%</Text>
            </View>
        </ScrollView>
    </View>
  );
}