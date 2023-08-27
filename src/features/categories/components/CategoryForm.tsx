import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../../../RootRoutes";
import {FC} from "react";
import {Form, TInputFieldProps} from "../../../components";
import {useCreateCategory} from "../hooks/mutation/useCreateCategory";
import {RouteProp, useRoute} from "@react-navigation/native";
import {View} from "react-native";

type Props = NativeStackScreenProps<RootRoutesParamList, 'CategoryForm'>;
type CreateCategoryInputExcludeGroupId = Omit<CreateCategoryInput, "groupId">
export const CategoryForm: FC<Props> = (props: Props) => {
    const {onSubmit} = useCategoryForm(props)
    const inputFields: TInputFieldProps<CreateCategoryInputExcludeGroupId>[] = [
        {placeholder: "カテゴリ名", name: "categoryName", rules: {required: true}},
        {placeholder: "カテゴリ説明", name: "categoryRemarks", rules: {required: true}},
    ]
    return (
        <View style={{flex: 1}}>
            <Form<CreateCategoryInputExcludeGroupId> onSubmit={onSubmit} inputFields={inputFields}/>
        </View>
    )
}

const useCategoryForm = (props: Props) => {
    const {mutateAsync} = useCreateCategory()
    const groupId = props.route.params.groupId

    const onSubmit = async (input: CreateCategoryInputExcludeGroupId) => {
        const param = {
            ...input,
            groupId
        }
        await mutateAsync(param)
        props.navigation.goBack()
    }

    return {onSubmit}
}