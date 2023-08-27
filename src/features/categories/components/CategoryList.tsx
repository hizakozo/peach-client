import {useCategories} from "../hooks/query/useCategories";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Icon, ListItem} from "@rneui/themed";
import {BaseCard} from "../../../components";
import {PlusIcon} from "./PlusIcon";

type CategoryListProps = {
    groupId: string;
    onPressCategory: (categoryId: string) => void;
}
export const CategoryList = (props: CategoryListProps) => {
    const {data = [], isLoading} = useCategoryList(props)
    if (isLoading) return <Text>Loading ...</Text>
    return (
        <View style={style.CategoryList}>
            <ScrollView>
                {
                    data.map((category, i) => (
                        <BaseCard key={i} onPress={() => {props.onPressCategory(category.categoryId)}} title={category.categoryName} subTitle={category.categoryRemarks} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const useCategoryList = ({groupId}: CategoryListProps) => {
    const {data, isLoading} = useCategories(groupId)
    return {
        data,
        isLoading,
    }
}

const style = StyleSheet.create({
    CategoryList: {
        flex: 1,
    },
})