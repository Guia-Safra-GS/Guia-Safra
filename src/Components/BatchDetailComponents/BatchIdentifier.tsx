import { View, Text } from 'react-native'
import { Sprout } from "lucide-react-native";

export function BatchIdentifier({ type, status, sensorId }: { type: string; status: string; sensorId: string }) {
    return (
        <View className="bg-white rounded-xl flex-row items-center justify-between p-4 w-full">
            
            <View className="flex-row items-center gap-3">
                
                <View className="bg-green-100 rounded-xl items-center justify-center p-3">
                    <Sprout size={30} color="green" />
                </View>
                <View className="justify-center">
                    <Text className="text-2xl font-bold">{type}</Text>
                    <Text className="text-sm text-gray-500">{sensorId}</Text>
                </View>
            </View>

            <View className="bg-green-100 px-3 py-1 rounded-full items-center justify-center">
                <Text className="text-lg text-green-700 font-semibold">{status}</Text>
            </View>
        </View>
    )
}