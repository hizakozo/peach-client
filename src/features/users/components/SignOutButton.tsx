import {Button} from "@rneui/themed";
import {appColor} from "../../../shared/styles";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
export const SignOutButton = () => {
    const { onPressSignOutButton } = useSignOutButton()
    return <Button title={"Sign out"} onPress={onPressSignOutButton} color={appColor} />
}

const useSignOutButton = () => {
    const onPressSignOutButton = async () => {
        await auth().signOut()
    }
    return {
        onPressSignOutButton
    }
}