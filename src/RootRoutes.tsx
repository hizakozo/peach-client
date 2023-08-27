import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
    NativeStackScreenProps
} from "@react-navigation/native-stack";
import {Groups} from "./pages/Groups";
import {Categories} from "./pages";
import {GroupForm} from "./features/groups/components/GroupForm";
import {CategoryForm} from "./features/categories/components/CategoryForm";
import {UserAvatar} from "./features/users/components/UserAvatar";
import {UserInfo} from "./pages/UserInfo";
import {FC} from "react";
import {useNavigation} from "@react-navigation/native";
import {Header} from "./components";

const Stack = createNativeStackNavigator<RootRoutesParamList>();

export type RootRoutesParamList = {
    Categories: { groupId: string };
    Groups: undefined;
    GroupForm: undefined;
    CategoryForm: { groupId: string };
    UserInfo: undefined;
    UserAvatar: undefined
};

export const RootRoutes = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Groups"}
            screenOptions={{
                header: (props) => {
                    return <Header nativeStackHeaderProps={props}/>
                },
            }}
        >
            <Stack.Screen
                component={Groups}
                name="Groups"
            />
            <Stack.Screen
                component={GroupForm}
                name="GroupForm"
            />
            <Stack.Screen
                component={Categories}
                name="Categories"
            />
            <Stack.Screen
                component={CategoryForm}
                name="CategoryForm"
            />
            <Stack.Screen
                component={UserInfo}
                name="UserInfo"
            />
        </Stack.Navigator>
    );
};