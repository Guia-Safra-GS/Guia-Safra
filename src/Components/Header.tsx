import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { User, LogOut, Menu } from "lucide-react-native";

import { useAuth } from "../Context/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const insets = useSafeAreaInsets();
    const iconTop = insets.top + 8;
    const dropdownTop = iconTop + 48;
    const { logout } = useAuth();
    const handleLogout = () => {
        setMenuOpen(false);
        logout();
    };

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedNome = await AsyncStorage.getItem("username");
                const storedEmail = await AsyncStorage.getItem("email");
                setNome(storedNome ?? "");
                setEmail(storedEmail ?? "");
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        loadUserData();
    }, []);

    return (
        <SafeAreaView className="bg-neutral-200 border-b border-gray-300 absolute top-0 w-full z-10">
            <View className="items-start gap-1 ml-4">
                <Text className="text-lg font-semibold text-gray-500">GUIA SAFRA</Text>
                <Text className="text-2xl font-bold">Bom dia, {nome}</Text>
            </View>
            
            <View className="absolute right-10 py-2" style={{ top: iconTop }}>
                <TouchableOpacity 
                    onPress={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-full"
                >
                    <Menu size={24} color="#000000" />
                </TouchableOpacity>
            </View>

            {menuOpen && (
                <View className="absolute right-5 bg-white rounded-xl shadow-lg p-2 w-fit" style={{ top: dropdownTop }}>
                    
                    <View className="flex-row items-center p-3 rounded-md">
                        <View className="p-2 bg-green-200/20 rounded-full">
                            <User size={20} color="#000000" />
                        </View>
                        <View>
                            <Text className="ml-3 text-gray-700 font-semibold">{nome}</Text>
                            <Text className="ml-3 text-gray-400 font-normal">{email}</Text>
                        </View>

                    </View>


                    <View className="border-b border-gray-300 my-2" />
                    
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex-row items-center p-3 rounded-md"
                    >
                        <LogOut size={20} color="#ef4444" />
                        <Text className="ml-3 text-red-500 font-semibold">Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}