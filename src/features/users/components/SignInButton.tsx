import {Button, StyleSheet, Text, View} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from "@react-native-google-signin/google-signin";
import React from "react";
import auth from "@react-native-firebase/auth";
import {instance} from "../../../lib/axios";

export const SignInButton = () => {
    const {onGoogleButtonPress} = useLogin()
    return (
        <GoogleSigninButton onPress={onGoogleButtonPress} style={{marginTop: 300}}/>
    )
}

const useLogin = () => {
    const onGoogleButtonPress = async () => {
        try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            const userClient = await auth().signInWithCredential(googleCredential)

        } catch (e) {
            console.log(e)
            throw e
        }
    }

    return {
        onGoogleButtonPress
    }
}