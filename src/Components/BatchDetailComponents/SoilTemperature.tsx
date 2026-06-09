import { View, Text } from "react-native";
import { Thermometer } from "lucide-react-native";

export function SoilTemperature() {
    return (
        <View className="bg-white rounded-xl items-start justify-center p-4">
            <View className="flex-row items-start gap-2">
                <Thermometer size={18} color="orange" />
                <Text className="text-lg text-orange-600 font-semibold">Temp.Solo</Text>
            </View>
            {/* Substitua os valores abaixo pelos da API- Puxa da API */}
            <Text className="text-2xl font-bold mt-2">22°C</Text>
            <Text className="text-sm text-gray-500 mt-1">Faixa ideal: 20°C a 25°C</Text>
        </View>
    )
}