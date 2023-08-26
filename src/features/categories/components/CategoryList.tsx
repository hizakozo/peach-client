import {useCategories} from "../hooks/query/useCategories";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Card, Icon, ListItem} from "@rneui/themed";
import {BaseCard} from "../../../components";

type CategoryListProps = {
    groupId: string;
    openCreateForm: () => void
}
export const CategoryList = (props: CategoryListProps) => {
    const {data = [], isLoading} = useCategoryList(props)
    if (isLoading) return <Text>Loading ...</Text>
    return (
        <View style={style.CategoryList}>
            <ScrollView>
                {
                    data.map((category, i) => (
                        <BaseCard key={i} onPress={() => {}} title={category.categoryName} subTitle={category.categoryRemarks} />
                    ))
                }
            </ScrollView>
            <Icon containerStyle={style.CategoryList__AddIconContainer} raised size={30} type="ionicon" name={"add"}
                  onPress={props.openCreateForm}/>
        </View>
    )
}

const useCategoryList = ({groupId, openCreateForm}: CategoryListProps) => {
    const {data, isLoading} = useCategories(groupId)
    return {
        data,
        isLoading,
    }
}

const style = StyleSheet.create({
    CategoryList: {
        position: "relative",
        marginBottom: 100
    },
    CategoryList__AddIconContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
    }
})