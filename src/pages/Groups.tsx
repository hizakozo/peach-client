import {GroupList} from "../features/groups/components/GroupList";
import {SignOutButton} from "../features/users/components";
import {Button, View} from "react-native";
import {RootRoutesParamList} from "../RootRoutes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {FC} from "react";

type Props = NativeStackScreenProps<RootRoutesParamList, 'Groups'>;

export const Groups: FC<Props> = ({navigation}) => {
    return (
        <View>
            <GroupList
                onPressGroup={(groupId) => navigation.navigate("Categories", {groupId})}
                openCreateForm={() => navigation.navigate("GroupForm")}
            />
            <SignOutButton />
        </View>
    )
}