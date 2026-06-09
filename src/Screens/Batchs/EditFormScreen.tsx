import { useNavigation, useRoute } from "@react-navigation/native";
import { EditFormWateringLimits } from "../../Components/BatchDetailComponents/EditFormWateringLimits"

export function EditBatchScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { speciesId } = route.params;

    return (
        <EditFormWateringLimits 
            speciesId={speciesId} 
            onCancel={() => navigation.goBack()}
            onSuccess={() => navigation.goBack()}
        />
    )
}
