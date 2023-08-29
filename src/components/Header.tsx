import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from "react";
import {UserAvatar} from "../features/users/components/UserAvatar";
import {NativeStackHeaderProps} from "@react-navigation/native-stack";
import {appColor} from "../shared/styles";
import {RootRoutesParamList} from "../RootRoutes";

type HeaderComponentProps = {
    view?: string;
    nativeStackHeaderProps: NativeStackHeaderProps
};
type RootRoutesParamListKey = keyof RootRoutesParamList
export const Header: React.FunctionComponent<HeaderComponentProps> = ({nativeStackHeaderProps}) => {
    const routeName: RootRoutesParamListKey = nativeStackHeaderProps.route.name as unknown as RootRoutesParamListKey
    return (
        <HeaderRNE
            statusBarProps={{
                backgroundColor: appColor
            }}
            containerStyle={styles.headerContainer}
            leftComponent={
                routeName !== "Groups" && routeName !== "SignIn" ?
                <Icon name={"chevron-back-outline"} type={"ionicon"} color={"#fff"} size={30} onPress={() => nativeStackHeaderProps.navigation.goBack()}/> : <></>
            }
            rightComponent={
                routeName !== "UserInfo" && routeName !== "SignIn" ?
                <UserAvatar onPress={() => nativeStackHeaderProps.navigation.navigate("UserInfo")}/> : <></>
            }
            centerComponent={{text: titleMapping[routeName], style: styles.heading}}
        >
        </HeaderRNE>
    )
}
const titleMapping: Record<RootRoutesParamListKey, string>　= {
    Categories: "カテゴリ一覧",
    Groups: "グループ一覧",
    GroupForm: "グループ作成",
    CategoryForm: "カテゴリ作成",
    UserInfo: "アカウント情報",
    Items: "アイテム一覧",
    SignIn: "サインイン",
    ItemForm: "アイテム作成",
    GroupInfo: "グループの設定",
    CreateGroupInvite: "招待コード作成",
    JoinGroup: "招待コードを入力"
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${appColor}`,
        width: '100%',
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
