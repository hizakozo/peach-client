import {View , Text} from "react-native";
import {SignOutButton} from "../features/users/components";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import {FC} from "react";
import {CategoryList} from "../features/categories/components/CategoryList";
import {rootStyles} from "./RootStyles";
import {PlusIcon} from "../features/categories/components/PlusIcon";
type Props = NativeStackScreenProps<RootRoutesParamList, 'Categories'>;

export const Categories: FC<Props> = ({navigation, route}) => {
    const {groupId} = route.params
    return (
        <View style={rootStyles.Root}>
            <CategoryList groupId={groupId} onPressCategory={(categoryId) => navigation.navigate("Items", {categoryId})}/>
            <PlusIcon containerStyle={rootStyles.AddIconContainer}
                      onPress={() => navigation.navigate("CategoryForm", {groupId})}/>
        </View>
    )
}