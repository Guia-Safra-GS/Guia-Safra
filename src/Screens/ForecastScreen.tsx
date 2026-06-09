import { View, ScrollView } from 'react-native'
import { ForecastCarrouselCard } from '../Components/ForecastComponents/ForecastCarrouselCard'
import { RainProbability } from '../Components/ForecastComponents/RainProbability'
import { IrrigationHistory } from "../Components/ForecastComponents/IrrigationHistory"

export function ForecastScreen() {
    return (
        <View className="flex-1 items-center justify-center px-4">
            <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                <ForecastCarrouselCard />
                <RainProbability />
                <IrrigationHistory />
            </ScrollView>
        </View>
    )
}