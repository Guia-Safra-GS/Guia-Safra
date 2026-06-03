import './global.css'; 
import AppNavigator from "./src/Navigation/AppNavigator"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
            <AppNavigatior />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}