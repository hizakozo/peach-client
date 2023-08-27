import {GroupList} from "../features/groups/components/GroupList";
import {Button, StyleSheet, View} from "react-native";
import {RootRoutesParamList} from "../RootRoutes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {FC, useEffect} from "react";
import {PlusIcon} from "../features/categories/components/PlusIcon";
import {rootStyles} from "./RootStyles";

type Props = NativeStackScreenProps<RootRoutesParamList, 'Groups'>;
export const Groups: FC<Props> = ({navigation}) => {
    return (
        <View style={rootStyles.Root}>
            <GroupList
                onPressGroup={(groupId) => navigation.navigate("Categories", {groupId})}
            />
            <PlusIcon containerStyle={rootStyles.AddIconContainer}
                      onPress={() => navigation.navigate("GroupForm")}/>
        </View>
    )
}
