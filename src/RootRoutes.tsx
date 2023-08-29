import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";
import {Groups} from "./pages/Groups";
import {Categories, SignIn} from "./pages";
import {GroupForm} from "./features/groups/components/GroupForm";
import {CategoryForm} from "./features/categories/components/CategoryForm";
import {UserAvatar} from "./features/users/components/UserAvatar";
import {UserInfo} from "./pages/UserInfo";
import {FC} from "react";
import {useNavigation} from "@react-navigation/native";
import {Header} from "./components";
import {Items} from "./pages/Items";
import {AuthProvider, useAuth} from "./provider/AuthProvider";
import auth from "@react-native-firebase/auth";
import {ItemForm} from "./features/items/components/ItemForm";
import {Group} from "./features/groups/types";
import {GroupInfo} from "./pages/GroupInfo";
import {CreateGroupInvite} from "./pages/CreateGroupInvite";
import {JoinGroup} from "./pages/JoinGroup";

const Stack = createNativeStackNavigator<RootRoutesParamList>();

export type RootRoutesParamList = {
    Categories: { groupId: string };
    Groups: undefined;
    GroupForm: {group: Group} | undefined;
    CategoryForm: { category?: Category, groupId: string };
    UserInfo: undefined;
    Items: { categoryId: string };
    SignIn: undefined;
    ItemForm: {categoryId: string}
    GroupInfo: {groupId: string}
    CreateGroupInvite: {groupId: string}
    JoinGroup: undefined
};

export const RootRoutes = () => {
    const {user} = useAuth();
    const isCurrentUserNull = user === null || user === undefined
    return (
            <Stack.Navigator
                screenOptions={{
                    header: (props) => {
                        return <Header nativeStackHeaderProps={props}/>
                    },
                }}
            >
                {
                    isCurrentUserNull ? <Stack.Screen
                            component={SignIn}
                            name="SignIn"
                        /> :
                        <Stack.Group>
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
                            <Stack.Screen
                                component={Items}
                                name="Items"
                            />
                            <Stack.Screen
                                component={ItemForm}
                                name="ItemForm"
                            />
                            <Stack.Screen
                                component={GroupInfo}
                                name="GroupInfo"
                            />
                            <Stack.Screen
                                component={CreateGroupInvite}
                                name="CreateGroupInvite"
                            />
                            <Stack.Screen
                                component={JoinGroup}
                                name="JoinGroup"
                            />
                        </Stack.Group>
                }
            </Stack.Navigator>
    );
};