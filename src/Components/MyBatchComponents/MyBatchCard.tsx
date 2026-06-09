import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MyBatchProgressBar } from "./MyBatchProgressBar";
import { Sprout, Droplets, ChevronRight } from "lucide-react-native";
import { RootStackParamList } from "../../Types/NavigationTypes";

// O formato da informação que vem do seu formulário
export interface RegistroFormulario {
  id: string;
  name: string;
  type: string;
  sensorId: string;
  status: string;
  humidity: number;
  speciesId: number;
}

interface CardProps {
  dados: RegistroFormulario;
}

export function MyBatchCard({ dados }: CardProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="bg-white gap-4 p-4 w-full rounded-3xl shadow-sm mb-4">
      {/* Cabeçalho do Card */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center flex-1 gap-2">
          <View className="bg-green-100 rounded-full items-center justify-center p-2">
            <Sprout size={35} color="#00d800" />
          </View>

          {/* Título e Subtítulo - Puxa da API */}
          <View>
            <Text className="text-lg font-bold text-gray-800">
              {dados.name}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {dados.type} · {dados.sensorId}
            </Text>
          </View>
        </View>

        {/* Badge de Status - Puxa da API */}
        <View className="bg-green-200 px-3 py-1 rounded-full">
          <Text className="text-xs font-medium text-green-700">
            {dados.status}
          </Text>
        </View>
      </View>

      {/* Linha da Barra de Progresso - Puxa da API */}
      <View className="flex-row items-center mb-5 gap-1">
        <Droplets color="#3b82f6" size={20} />

        {/* Barra de Progresso - Puxa da API */}
        <MyBatchProgressBar percentage={dados.humidity} />

        {/* Porcentagem - Puxa da API */}
        <Text className="text-sm font-semibold text-gray-800">
          {dados.humidity}%
        </Text>
      </View>

      {/* Botão Inferior */}
      <TouchableOpacity
        className="bg-gray-200 rounded-full items-center justify-center flex-row py-3"
        onPress={() => navigation.navigate("BatchDetails", { 
          id: dados.id,
          sensorId: dados.sensorId,
          type: dados.type,
          status: dados.status,
          speciesId: dados.speciesId
        })}
      >
        <Text className="text-gray-800 font-semibold">Ver detalhes </Text>
        <ChevronRight size={20} color="#4b5563" />
      </TouchableOpacity>
    </View>
  );
}
