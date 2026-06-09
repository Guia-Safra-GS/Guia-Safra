//Irá deletar na API

import { Text, TouchableOpacity } from "react-native";
import { SlidersVertical } from "lucide-react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../Types/NavigationTypes";

interface WateringLimitsButtonProps {
    speciesId: number;
}

export function WateringLimitsButton({ speciesId }: WateringLimitsButtonProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity 
            className="bg-blue-600 rounded-3xl p-4 w-full items-center mt-5 flex-row justify-center gap-2" 
            onPress={() => navigation.navigate("EditBatchScreen", { speciesId })}
        >
            <SlidersVertical size={20} color="#ffffff" />
            <Text className="text-white text-lg font-semibold">
                Editar Limites de Rega
            </Text>
        </TouchableOpacity>
    )
}
