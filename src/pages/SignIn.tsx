import {View, Text} from "react-native";
import {SignInButton, SignOutButton} from "../features/users/components";

export const SignIn = () => {
    return (
        <View>
            <Text>
                Googleアカウントでサインイン
            </Text>
            <SignInButton />
            <SignOutButton />
        </View>
    )
}