import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import {FC, useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {ListItem} from "@rneui/themed";
import {UserAvatar} from "../features/users/components/UserAvatar";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {SignOutButton} from "../features/users/components";

type Props = NativeStackScreenProps<RootRoutesParamList, 'UserInfo'>;

export const UserInfo: FC<Props> = ({navigation}) => {
    const {displayContent} = useUserInfo()
    return (
        <View style={style.userInfo}>
            <ListItem>
                <UserAvatar />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                        { displayContent.name }
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        { displayContent.address }
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="white" />
            </ListItem>
            <SignOutButton />
        </View>
    )
}
type DisplayContent = {
    name: string,
    address: string,
}
const useUserInfo = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
    useEffect(() => {
        (async () => {
            const user = await auth().currentUser
            setUser(user)
        })()
    }, [])
    const displayContent: DisplayContent = {
        name: user?.displayName ?? "",
        address: user?.email ?? "",
    }
    return {
        displayContent
    }
}

const style = StyleSheet.create({
    userInfo: {
        flex: 1
    }
})