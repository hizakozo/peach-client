import {Button} from "react-native";
import auth from '@react-native-firebase/auth';
export const SignOutButton = () => {
    const { onPressSignOutButton } = useSignOutButton()
    return <Button title={"Sign out"} onPress={onPressSignOutButton}/>
}

const useSignOutButton = () => {
    const onPressSignOutButton = async () => {
        await auth().signOut()
    }
    return {
        onPressSignOutButton
    }
}