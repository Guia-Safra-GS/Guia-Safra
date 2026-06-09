import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { AlertTriangle, X } from "lucide-react-native";

interface PopUpDeleteConfirmProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  batchName?: string;
}

export function PopUpDeleteConfirm({ visible, onConfirm, onCancel, batchName }: PopUpDeleteConfirmProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        <View className="w-full bg-white rounded-[24px] p-6 items-center relative">
          <TouchableOpacity className="absolute right-4 top-4" onPress={onCancel}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>

          <View className="w-20 h-20 rounded-full bg-red-100 justify-center items-center mb-4">
            <AlertTriangle size={48} color="#ef4444" />
          </View>

          <Text className="text-xl font-bold text-gray-800 mb-2">Confirmar Exclusão</Text>
          
          <Text className="text-base text-gray-600 text-center mb-6 leading-6">
            Tem certeza que deseja excluir o lote {batchName ? <Text className="font-bold text-gray-900">{batchName}</Text> : "selecionado"}? 
            Esta ação não pode ser desfeita.
          </Text>

          <View className="flex-row w-full gap-3">
            <TouchableOpacity 
              className="flex-1 h-[52px] bg-gray-100 rounded-xl justify-center items-center" 
              onPress={onCancel}
            >
              <Text className="text-gray-600 text-base font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-1 h-[52px] bg-red-500 rounded-xl justify-center items-center" 
              onPress={onConfirm}
            >
              <Text className="text-white text-base font-semibold">Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
