import {View, Text} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import React, {FC} from "react";
import {GoogleSignin, GoogleSigninButton} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import {useAuth} from "../provider/AuthProvider";

type Props = NativeStackScreenProps<RootRoutesParamList, 'SignIn'>;

export const SignIn: FC<Props> = ({navigation}) => {
    const {googleSignIn} = useAuth()
    return (
        <View>
            <Text>
                Googleアカウントでサインイン
            </Text>
            <GoogleSigninButton onPress={googleSignIn} style={{marginTop: 300}}/>
        </View>
    )
}
