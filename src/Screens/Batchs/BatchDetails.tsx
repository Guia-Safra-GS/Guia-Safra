import { View, Text } from 'react-native'
import { DeleteBatch } from '../../Components/BatchDetailComponents/DeleteBatch';
import { WateringLimitsButton } from '../../Components/BatchDetailComponents/WateringLimitsButton';
import { BatchHumidity } from '../../Components/BatchDetailComponents/BatchHumidity';
import { SoilTemperature } from '../../Components/BatchDetailComponents/SoilTemperature';
import { BatchIdentifier } from '../../Components/BatchDetailComponents/BatchIdentifier';
import { SensorActivity } from '../../Components/BatchDetailComponents/SensorActivity';

export function BatchDetails({ route }: { route: any }) {
    const { id, sensorId, type, status, speciesId } = route.params;
    return (
        <View className="flex-1 w-full items-center justify-center px-2">
            <BatchIdentifier sensorId={sensorId} type={type} status={status} />
            <View className="flex-row w-screen justify-center py-4 shadow-sm gap-4">
                <BatchHumidity />
                <SoilTemperature />
            </View>
            <SensorActivity />
            <WateringLimitsButton speciesId={speciesId} />
            <DeleteBatch batchId={Number(id)} batchName={type} />
        </View>
    )
}