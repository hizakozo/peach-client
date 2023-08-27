import React, {createContext, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
type User = FirebaseAuthTypes.User;
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {WEB_CLIENT} from "@env";

type Auth = {
    user: User | null;
    googleSignIn: () => Promise<void>;
};
export const AuthContext = createContext<Auth>({} as Auth)
export const useAuth = () => {
    return useContext(AuthContext)
}
type  AuthProviderProps = {
    children: React.ReactNode
}
export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT,
            scopes: ['email'],
        });
    }, [])
    useEffect(() => {
        return auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
            setUser(user);
        }); // unsubscribe on unmount
    }, []);

    const googleSignIn = async () => {
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
    return <AuthContext.Provider value={{user, googleSignIn}}>{children}</AuthContext.Provider>;
}
