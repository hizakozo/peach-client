import {View , Text} from "react-native";
import {SignOutButton} from "../features/users/components";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import {FC} from "react";
import {CategoryList} from "../features/categories/components/CategoryList";
type Props = NativeStackScreenProps<RootRoutesParamList, 'Categories'>;

export const Categories: FC<Props> = ({navigation, route}) => {
    const {groupId} = route.params
    return (
        <View>
            <CategoryList groupId={groupId} openCreateForm={() => navigation.navigate("CategoryForm", {groupId})}/>
            <SignOutButton />
        </View>
    )
}