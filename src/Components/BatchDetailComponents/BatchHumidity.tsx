import { View, Text } from "react-native";
import { Droplets } from "lucide-react-native";

export function BatchHumidity() {
    return (
        <View className="bg-white rounded-xl items-start justify-center p-4">
            <View className="flex-row items-start gap-2">
                <Droplets size={18} color="blue" />
                <Text className="text-lg text-blue-600 font-semibold">UMIDADE</Text>
            </View>
            {/* Substitua os valores abaixo pelos da API - Puxa da API*/}
            <Text className="text-2xl font-bold mt-2">22%</Text>
            <Text className="text-sm text-gray-500 mt-1">Faixa ideal: 20% a 25%</Text>
        </View>
    )
}
