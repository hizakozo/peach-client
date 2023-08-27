import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from "react";
import {UserAvatar} from "../features/users/components/UserAvatar";
import {NativeStackHeaderProps} from "@react-navigation/native-stack";
import {appColor} from "../shared/styles";

type HeaderComponentProps = {
    view?: string;
    nativeStackHeaderProps: NativeStackHeaderProps
};
export const Header: React.FunctionComponent<HeaderComponentProps> = ({nativeStackHeaderProps}) => {
    return (
        <HeaderRNE
            statusBarProps={{
                backgroundColor: appColor
            }}
            containerStyle={styles.headerContainer}
            leftComponent={
            nativeStackHeaderProps.route.name !== "Groups" ?
                <Icon name={"chevron-back-outline"} type={"ionicon"} color={"#fff"} size={30} onPress={() => nativeStackHeaderProps.navigation.goBack()}/> : <></>
            }
            rightComponent={
            nativeStackHeaderProps.route.name !== "UserInfo" ?
                <UserAvatar onPress={() => nativeStackHeaderProps.navigation.navigate("UserInfo")}/> : <></>
            }
            centerComponent={{text: nativeStackHeaderProps.route.name, style: styles.heading}}
        >
        </HeaderRNE>
    )
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
