import {GroupList} from "../features/groups/components/GroupList";
import {Button, StyleSheet, View} from "react-native";
import {RootRoutesParamList} from "../RootRoutes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {FC, useEffect, useState} from "react";
import {PlusIcon} from "../features/categories/components/PlusIcon";
import {rootStyles} from "./RootStyles";
import {SpeedDial} from "@rneui/themed";

type Props = NativeStackScreenProps<RootRoutesParamList, 'Groups'>;
export const Groups: FC<Props> = ({navigation}) => {
    const [isOpenAddMenu, setOpenAddMenu] = useState(false)
    return (
        <View style={rootStyles.Root}>
            <GroupList
                onPressGroup={(groupId) => navigation.navigate("Categories", {groupId})}
                onPressEditIcon={(groupId) => {navigation.navigate("GroupInfo", {groupId})}}
            />
            {/*<PlusIcon containerStyle={rootStyles.AddIconContainer}*/}
            {/*          onPress={() => navigation.navigate("GroupForm")}/>*/}
            <SpeedDial
                // containerStyle={rootStyles.AddIconContainer}
                isOpen={isOpenAddMenu}
                icon={{ name: 'add-outline', type: 'ionicon', color: '#fff'}}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpenAddMenu(true)}
                onClose={() => setOpenAddMenu(false)}
            >
                <SpeedDial.Action
                    icon={{ name: 'add-outline', type: 'ionicon', color: '#fff' }}
                    title="グループ作成"
                    onPress={() => {
                        navigation.navigate("GroupForm")
                        setOpenAddMenu(false)
                    }}
                />
                <SpeedDial.Action
                    icon={{ name: 'enter-outline', type: 'ionicon', color: '#fff' }}
                    title="招待コードでグループに参加"
                    onPress={() => {
                        navigation.navigate("JoinGroup")
                        setOpenAddMenu(false)
                    }}
                />
            </SpeedDial>
        </View>
    )
}
