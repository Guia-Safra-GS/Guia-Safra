import { View, Text } from "react-native"
import { Satellite, Cloud, CloudSun, Sun, CloudRain} from "lucide-react-native";

const weatherIcons = {
    "Ensolarado": <Sun size={40} color="#0000ff" />,
    "Nublado": <Cloud size={40} color="#0000ff" />,
    "Parcialmente Nublado": <CloudSun size={40} color="#0000ff" />,
    "Chuvoso": <CloudRain size={40} color="#0000ff" />, // Pode ser substituído por um ícone de chuva
};

export function ForecastCard() {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm w-full">
        {/* header do card */}    
        <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-3">
                <Satellite size={20} color="#0000ff" />
                <Text className="text-md text-blue-700 font-bold mb-2">CLIMA · SATÉLITE </Text>
            </View>
            {/* Localização - Puxa da API */}
            <Text className="text-sm text-gray-500 mb-4">Sitío Boa Vista</Text>
        </View>
        
        {/* Corpo do card */}
        <View className="mb-2 flex-row items-center justify-between px-2">
            <View className="items-start">
                {/* Temperatura - Puxa da API */}
                <Text className="text-5xl font-bold">25°C</Text>
                {/* Status do céu - Puxa da API */}
                <Text className="text-sm text-gray-500 ">Ensolarado</Text>
            </View>
            <View className="items-center bg-blue-300/40 rounded-2xl p-2 w-30 h-30">
                {/* Ícone do clima - Puxa da API */}
                {weatherIcons["Ensolarado"]} {/* Substitua "Ensolarado" pela condição real do clima */}
            </View>
        </View>

        <View className="my-2 border-b border-gray-200" />
        
        {/* Dados adicionais - Puxa da API */}
        <View className="flex-row items-center justify-between p-2">
            <View className="items-center">
                <Text className="text-sm text-gray-500">Umidade: </Text>
                <Text className="text-sm font-semibold">60%</Text>
            </View>
            <View className="items-center">
                <Text className="text-sm text-gray-500">Chuva </Text>
                <Text className="text-sm font-semibold">10%</Text>
            </View>
            <View className="items-center">
                <Text className="text-sm text-gray-500">Vento: </Text>
                <Text className="text-sm font-semibold">15 km/h</Text>
            </View>
        </View>
    </View>
  )
}