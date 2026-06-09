//Irá deletar na API

import { useState } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { Trash } from "lucide-react-native";
import { PopUpDeleteConfirm } from "../PopUpDeleteConfirm";
import { deleteBatch } from "../../Services/api";
import { useNavigation } from "@react-navigation/native";

interface DeleteBatchProps {
    batchId: number;
    batchName?: string;
}

export function DeleteBatch({ batchId, batchName }: DeleteBatchProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteBatch(batchId);
            setModalVisible(false);
            Alert.alert("Sucesso", "Lote deletado com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível deletar o lote.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TouchableOpacity 
                className="bg-red-600 rounded-3xl p-4 w-full items-center mt-5 flex-row justify-center gap-2" 
                onPress={() => setModalVisible(true)}
            >
                <Trash size={20} color="#ffffff" />
                <Text className="text-white text-lg font-semibold">
                    Deletar Lote
                </Text>
            </TouchableOpacity>

            <PopUpDeleteConfirm 
                visible={modalVisible}
                onConfirm={handleDelete}
                onCancel={() => setModalVisible(false)}
                batchName={batchName}
            />
        </>
    )
}
