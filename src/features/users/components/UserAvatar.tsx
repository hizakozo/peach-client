import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {FC, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Avatar, Icon} from "@rneui/themed";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../../../RootRoutes";

type UserAvatarProps = {
    onPress?: () => void
}


export const UserAvatar = (props: UserAvatarProps) => {
    const {photoURL, onPress} = useUserAvatar()
    if (photoURL === null || photoURL === undefined) {
        return (
            <Icon size={45} type="ionicon" name={"person-circle-outline"} color='#517fa4' onPress={props.onPress}/>
        )
    }
    return <Avatar
        size={45}
        rounded
        source={photoURL ? {uri: photoURL} : {}}
        onPress={props.onPress}
    />
}

const useUserAvatar = () => {
    const [photoURL, setPhotoUrl] = useState<string | null | undefined>(null)
    useEffect(() => {
        (async () => {
            const user = await auth().currentUser
            setPhotoUrl(user?.photoURL)
        })()
    }, [])
    const onPress = () => {

    }
    return {
        photoURL,
        onPress
    }
}