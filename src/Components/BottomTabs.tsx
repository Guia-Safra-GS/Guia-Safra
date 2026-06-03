import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { House, Sprout, CirclePlus, CloudSun } from "lucide-react-native"
import { BatchDetailsProps, DashboardScreenProps, ForecastScreenProps, MyBatchScreenProps, NewBatchScreenProps } from '../Types/types';

export default function BottomTabs({ navigation }: DashboardScreenProps & MyBatchScreenProps & BatchDetailsProps & NewBatchScreenProps & ForecastScreenProps) {
    return (
        <SafeAreaView className="bg-gray-200 p-5 absolute bottom-0 ">
            {/* Botão Inicio/Home */}
            <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen')}>
                <View className="items-center gap-2 text-gray-400">
                    <House size={24} color="#000" />
                    <Text className="text-xs">Início</Text>
                </View>
            </TouchableOpacity>

            {/* Botão Lotes/Batchs */}
            <TouchableOpacity onPress={() => navigation.navigate('MyBatchScreen')}>
                <View className="items-center gap-2 text-gray-400">
                    <Sprout size={24} color="#000" />
                    <Text className="text-xs">Lotes</Text>
                </View>
            </TouchableOpacity>

            {/* Botão Novo Lote/Batch */}
            <TouchableOpacity onPress={() => navigation.navigate('NewBatchScreen')}>
                <View className="items-center gap-2 text-gray-400">
                    <CirclePlus size={24} color="#000" />
                    <Text className="text-xs">Novo</Text>
                </View>
            </TouchableOpacity>

            {/* Botão Previsão/Forecast */}
            <TouchableOpacity onPress={() => navigation.navigate('ForecastScreen')}>
                <View className="items-center gap-2 text-gray-400">
                    <CloudSun size={24} color="#000" />
                    <Text className="text-xs">Previsão</Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
};