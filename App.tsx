import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Categories, SignIn} from "./src/pages";
import {
    QueryClientProvider,
    focusManager,
} from '@tanstack/react-query'
import {queryClient} from "./src/lib/react-query";
import {Groups} from "./src/pages/Groups";
import {instance} from "./src/lib/axios";
import {RootRoutes} from "./src/RootRoutes";
import {WEB_CLIENT} from "@env"

export default function App() {
    const {user, initializing} = useAuth()
    const Stack = createNativeStackNavigator();
    GoogleSignin.configure({
        webClientId: WEB_CLIENT,
        scopes: ['email'],
    });

    if (initializing) return <></>
    if (!user) return <SignIn/>
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <RootRoutes />
            </NavigationContainer>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const useAuth = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    return {
        user,
        initializing
    }
}
