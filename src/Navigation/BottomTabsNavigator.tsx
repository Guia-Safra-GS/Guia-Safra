import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../Screens/DashboardScreen';
import { ForecastScreen } from '../Screens/ForecastScreen';
import { NewBatchScreen } from '../Screens/Batchs/NewBatchScreen';
import { MyBatchScreen } from '../Screens/Batchs/MyBatchScreens';
import { House, Sprout, CirclePlus, CloudSun } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export function BottomTabsNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Início" component={DashboardScreen} options={{ tabBarIcon: ({ focused }) => (focused ? <House /> : <House />) }} />
        <Tab.Screen name="Lotes" component={MyBatchScreen} options={{ tabBarIcon: ({ focused }) => (focused ? <Sprout /> : <Sprout />) }} />
        <Tab.Screen name="Novo" component={NewBatchScreen} options={{ tabBarIcon: ({ focused }) => (focused ? <CirclePlus /> : <CirclePlus />) }} />
        <Tab.Screen name="Previsão" component={ForecastScreen} options={{ tabBarIcon: ({ focused }) => (focused ? <CloudSun /> : <CloudSun />) }} />
    </Tab.Navigator>
  );
}