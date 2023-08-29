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
import {AuthProvider} from "./src/provider/AuthProvider";
import {NotificationDialogProvider} from "./src/provider/NotificationDialogProvider";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NotificationDialogProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer>
                        <RootRoutes />
                    </NavigationContainer>
                </QueryClientProvider>
            </AuthProvider>
        </NotificationDialogProvider>
    );
}
