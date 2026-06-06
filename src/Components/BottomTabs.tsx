import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from '../Navigation/BottomTabsNavigator';

export default function BottomTabs() {
    return (
    <NavigationContainer>
        <BottomTabsNavigator />
    </NavigationContainer>
    )
}
