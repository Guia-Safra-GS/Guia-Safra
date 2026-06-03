import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

let nome = 'Usuário'

export default function Header() {
    return (
        <SafeAreaView className="bg-gray-200 p-4 absolute top-0 ">
            <View className="items-center">
                <Text className="text-lg">Guia Safra</Text>
                <Text className="text-lg">Bom dia {nome}</Text>
            </View>
        </SafeAreaView>
    )
}