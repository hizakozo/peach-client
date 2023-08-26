import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Groups} from "./pages/Groups";
import {Categories} from "./pages";
import {GroupForm} from "./features/groups/components/GroupForm";
import {CategoryForm} from "./features/categories/components/CategoryForm";

const Stack = createNativeStackNavigator<RootRoutesParamList>();

export type RootRoutesParamList = {
    Categories: {groupId: string};
    Groups: undefined;
    GroupForm: undefined;
    CategoryForm: {groupId: string};
};

export const RootRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={"Groups"}>
            <Stack.Screen
                component={Groups}
                name="Groups"
                options={{title: 'Groups'}}
            />
            <Stack.Screen
                component={GroupForm}
                name="GroupForm"
                options={{title: 'Group作成'}}
            />
            <Stack.Screen
                component={Categories}
                name="Categories"
                options={{title: 'Categories'}}
            />
            <Stack.Screen
                component={CategoryForm}
                name="CategoryForm"
                options={{title: 'CategoryForm'}}
            />
        </Stack.Navigator>
    );
};