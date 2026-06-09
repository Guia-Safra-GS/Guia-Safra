//Irá deletar na API

import { Text, TouchableOpacity } from "react-native";
import { Trash } from "lucide-react-native";

export function DeleteBatch() {
    return (
        <TouchableOpacity className="bg-red-600 rounded-3xl p-4 w-full items-center mt-5 flex-row justify-center gap-2" onPress={() => {}}>
            {/* onPress Abre modal de confirmação e que ao confirmar remove o lote diretamente no banco de dados - Puxa da API */}
            <Trash size={20} color="#ffffff" />
            <Text className="text-white text-lg font-semibold">
                Deletar Lote
            </Text>
        </TouchableOpacity>
    )
}
