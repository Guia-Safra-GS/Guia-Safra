import { View, Text } from 'react-native'
import { DeleteBatch } from '../../Components/BatchDetailComponents/DeleteBatch';
import { WateringLimitsButton } from '../../Components/BatchDetailComponents/WateringLimitsButton';
import { BatchHumidity } from '../../Components/BatchDetailComponents/BatchHumidity';
import { SoilTemperature } from '../../Components/BatchDetailComponents/SoilTemperature';
import { BatchIdentifier } from '../../Components/BatchDetailComponents/BatchIdentifier';


export function BatchDetails({ route }: { route: any }) {
    const { sensorId, type, status } = route.params;
    return (
        <View className="flex-1 w-full items-center justify-center px-2">
            <BatchIdentifier sensorId={sensorId} type={type} status={status} />
            <View className="flex-row w-full justify-center py-4 rounded-3xl shadow-sm mb-4 gap-4">
                <BatchHumidity />
                <SoilTemperature />
            </View>
            <WateringLimitsButton />
            <DeleteBatch />
        </View>
    )
}