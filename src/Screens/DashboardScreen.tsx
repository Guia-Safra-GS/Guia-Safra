import { View, Text, TouchableOpacity } from "react-native";
import { DashboardScreenProps } from "../Types/types";
import { useAuth } from "../Context/AuthContext";

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={handleLogout}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
