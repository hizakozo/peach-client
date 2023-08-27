import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import {FC} from "react";
import {rootStyles} from "./RootStyles";
import {PlusIcon} from "../features/categories/components/PlusIcon";
import {View} from "react-native";
import {ItemList} from "../features/items/components/ItemList";

type Props = NativeStackScreenProps<RootRoutesParamList, 'Items'>;

export const Items: FC<Props> = ({navigation, route}) => {
    return (
        <View style={rootStyles.Root}>
            <ItemList
                categoryId={route.params.categoryId}
            />
            <PlusIcon containerStyle={rootStyles.AddIconContainer}
                      onPress={() => navigation.navigate("ItemForm", {categoryId: route.params.categoryId})}/>
        </View>
    )
}