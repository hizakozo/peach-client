import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../../../RootRoutes";
import {FC} from "react";
import {Form, TInputFieldProps} from "../../../components";
import {useCreateCategory} from "../hooks/mutation/useCreateCategory";
import {RouteProp, useRoute} from "@react-navigation/native";
import {View} from "react-native";
import {useUpdateCategory} from "../hooks/mutation/useUpdateCategory";

type Props = NativeStackScreenProps<RootRoutesParamList, 'CategoryForm'>;
type CreateCategoryInputExcludeGroupId = Omit<CreateCategoryInput, "groupId">
export const CategoryForm: FC<Props> = (props) => {
    const {onSubmit, defaultValues} = useCategoryForm(props)
    const inputFields: TInputFieldProps<CreateCategoryInputExcludeGroupId>[] = [
        {placeholder: "カテゴリ名", name: "categoryName", rules: {required: true}},
        {placeholder: "カテゴリ説明", name: "categoryRemarks", rules: {required: true}},
    ]
    return (
        <View style={{flex: 1}}>
            <Form<CreateCategoryInputExcludeGroupId> onSubmit={onSubmit} inputFields={inputFields} defaultValues={defaultValues}/>
        </View>
    )
}

const useCategoryForm = (props: Props) => {
    const {mutateAsync} = useCreateCategory()
    const {mutateAsync: updateCategory} = useUpdateCategory(props.route.params.groupId)
    const groupId = props.route.params.groupId
    const category = props.route.params.category

    const onSubmit = async (input: CreateCategoryInputExcludeGroupId) => {
        const param = {
            ...input,
            groupId
        }
        if (category === undefined) {
            await mutateAsync(param)
        } else {
            await updateCategory({categoryId: category.categoryId, input})
        }
        props.navigation.goBack()
    }

    const defaultValues: CreateCategoryInputExcludeGroupId | undefined = category && {
        categoryName: category.categoryName,
        categoryRemarks: category.categoryRemarks
    }

    return {onSubmit , defaultValues}
}