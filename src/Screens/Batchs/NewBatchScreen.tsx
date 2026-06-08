import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Save } from "lucide-react-native";

interface FormData {
  name: string;
  type: string;
  sensorId: string;
}

export function NewBatchScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    sensorId: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    sensorId: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      type: "",
      sensorId: "",
    };
    let isValid = true;

    if (formData.name.length > 0) {
      newErrors.name = "Nome da área não pode ser vazio";
      isValid = false;
    }

    if (formData.type.length > 0) {
      newErrors.type = "Tipo de cultivo não pode ser vazio";
      isValid = false;
    }

    if (formData.sensorId.length > 0) {
      newErrors.sensorId = "ID do sensor não pode ser vazio";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-center py-1 bg-neutral-100 p-2"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="w-full p-3 items-start flex-col gap-3">
        <Text className="text-lg font-normal text-gray-500">
          Cadastre uma nova área de plantio e vincule o sensor IoT que fará o
          monitoramento
        </Text>
      </View>

      <View className="w-full p-5 items-start gap-3 bg-white rounded-3xl">
        <Text className="text-sm font-semibold text-gray-700">
          Nome da Área
        </Text>
        <TextInput
          placeholder=" Ex: Horta Norte"
          placeholderTextColor="#9ca3af"
          className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-lg px-4 text-neutral-900"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        {errors.name ? (
          <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
        ) : null}

        <Text className="text-sm font-semibold text-gray-700">
          Tipo de Cultivo
        </Text>
        <TextInput
          placeholder="Ex: Tomate, Milho..."
          placeholderTextColor="#9ca3af"
          className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-lg px-4 text-neutral-900"
          value={formData.type}
          onChangeText={(text) => setFormData({ ...formData, type: text })}
        />
        {errors.type ? (
          <Text className="text-red-500 text-xs mt-1">{errors.type}</Text>
        ) : null}

        <Text className="text-sm font-semibold text-gray-700">
          ID do Sensor
        </Text>
        <TextInput
          placeholder="Ex: ESP32-A1"
          placeholderTextColor="#9ca3af"
          className="w-full h-12 bg-neutral-50 border border-neutral-300 rounded-lg px-4 text-neutral-900"
          value={formData.sensorId}
          onChangeText={(text) => setFormData({ ...formData, sensorId: text })}
        />
        {errors.sensorId ? (
          <Text className="text-red-500 text-xs mt-1">{errors.sensorId}</Text>
        ) : null}

        <TouchableOpacity className="bg-green-500 rounded-lg p-4 w-full items-center mt-5 flex-row justify-center gap-2" onPress={() => {}}>
          <Save size={20} color="#ffffff" />
          <Text className="text-white text-lg font-semibold">
            Cadastrar Área
          </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}
