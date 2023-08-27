import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../../../RootRoutes";
import {FC} from "react";
import {Form, TInputFieldProps} from "../../../components";
import {View} from "react-native";
import {CreateItemInput} from "../types";
import {useCreateItem} from "../hooks/mutaition";

type Props = NativeStackScreenProps<RootRoutesParamList, 'ItemForm'>;
type CreateItemInputExcludeCategoryId = Omit<CreateItemInput, "categoryId">
export const ItemForm: FC<Props> = (props: Props) => {
    const {onSubmit} = useItemForm(props)
    const inputFields: TInputFieldProps<CreateItemInputExcludeCategoryId>[] = [
        {placeholder: "アイテム名", name: "itemName", rules: {required: true}},
        {placeholder: "アイテム説明", name: "itemRemarks", rules: {required: false}},
    ]
    return (
        <View style={{flex: 1}}>
            <Form<CreateItemInputExcludeCategoryId> onSubmit={onSubmit} inputFields={inputFields}/>
        </View>
    )
}

const useItemForm = (props: Props) => {
    const {mutateAsync} = useCreateItem()
    const categoryId = props.route.params.categoryId

    const onSubmit = async (input: CreateItemInputExcludeCategoryId) => {
        const param = {
            ...input,
            categoryId
        }
        await mutateAsync(param)
        props.navigation.goBack()
    }

    return {onSubmit}
}