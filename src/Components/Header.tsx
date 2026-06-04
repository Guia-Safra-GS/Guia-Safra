import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export function Header() {
    const [nome, setNome] = useState("");

    useEffect(() => {
        const loadNome = async () => {
            try {
                const storedNome = await AsyncStorage.getItem("username");
                setNome(storedNome ?? "");
            } catch (error) {
                console.error("Error loading username:", error);
            }
        };

        loadNome();
    }, []);

    return (
        <SafeAreaView className="bg-neutral-200 p-4 absolute top-0 w-full ">
            <View className="items-start gap-1">
                <Text className="text-lg text-gray-500">Guia Safra</Text>
                <Text className="text-2xl font-bold">Bom dia, {nome}</Text>
            </View>
        </SafeAreaView>
    )
}