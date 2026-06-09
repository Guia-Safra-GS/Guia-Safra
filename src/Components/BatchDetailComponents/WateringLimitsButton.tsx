//Irá deletar na API

import { Text, TouchableOpacity } from "react-native";
import { SlidersVertical } from "lucide-react-native";

export function WateringLimitsButton() {
    return (
        <TouchableOpacity className="bg-blue-600 rounded-3xl p-4 w-full items-center mt-5 flex-row justify-center gap-2" onPress={() => {}}>
            {/* onPress leva para uma página que permite fazer um PUT e editar os limites - Puxa da API */}
            <SlidersVertical size={20} color="#ffffff" />
            <Text className="text-white text-lg font-semibold">
                Editar Limites de Rega
            </Text>
        </TouchableOpacity>
    )
}
