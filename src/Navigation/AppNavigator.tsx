import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoaderCircle } from "lucide-react-native"

// Navegação pré/pós login
import { useAuth } from "../Context/AuthContext";

// Import das Screens
import { LoginScreen } from "../Screens/LoginScreen";
import { RegisterScreen } from "../Screens/RegisterScreen";
import { DashboardScreen } from "../Screens/DashboardScreen";
import MyBatchScreen from "../Screens/Batchs/MyBatchScreens";
import NewBatchScreen from "../Screens/Batchs/NewBatchScreen";
import BatchDetails from "../Screens/Batchs/BatchDetails";
import ForecastScreen from "../Screens/ForecastScreen";
import { Header } from "../Components/Header";
import { RootStackParamList } from "../Types/types";
import { BottomTabs } from '../Components/BottomTabs';
 

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
    const { loggedIn, loading } = useAuth();

    if (loading) return <LoaderCircle />; // Aguarde carregar

    return (
        <Stack.Navigator>
            {loggedIn ? (
                // Stack para usuário autenticado
                <Stack.Group screenOptions={{ header: () => <Header /> }}>
                    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
                    <Stack.Screen name="MyBatchScreen" component={MyBatchScreen} />
                    <Stack.Screen name="NewBatchScreen" component={NewBatchScreen} />
                    <Stack.Screen name="ForecastScreen" component={ForecastScreen} />
                    <Stack.Screen name="BatchDetails" component={BatchDetails} />
                </Stack.Group>
            ) : (
                // Stack para usuário NÃO autenticado
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
}