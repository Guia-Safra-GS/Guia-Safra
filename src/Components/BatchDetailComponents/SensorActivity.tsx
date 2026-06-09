import { View, Text } from "react-native";
import { Clock, Cpu, Droplets } from "lucide-react-native";

export function SensorActivity() {
    return (
        <View className="bg-white rounded-2xl p-4 shadow-sm w-full">
            <View className="flex-row items-center gap-2 mb-4">
                <Text className="text-md font-medium">
                    Atividade do Sensor
                </Text>
            </View>

            <View className="mt-2 gap-2">
                <View className="flex-row items-center gap-2">
                    <View className="flex-row items-center gap-2">
                        <Clock size={20} color="#6b7280" />
                        <Text className="text-sm text-gray-500">
                            Última rega
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Text className="text-sm text-gray-500">
                            Há 2 dias
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-2">
                    
                    <View className="flex-row items-center gap-2">
                        <Cpu size={20} color="#6b7280" />
                        <Text className="text-sm text-gray-500">
                            Sinal IoT
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Text className="text-sm text-gray-500">
                            Online
                        </Text>
                    </View>
                
                </View>

                <View className="flex-row items-center gap-2">
                    <View className="flex-row items-center gap-2">
                        <Droplets size={20} color="#6b7280" />
                        <Text className="text-sm text-gray-500">
                            Próx. rega prevista
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Text className="text-sm text-gray-500">
                            Amanhã, 6:00
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    );
}