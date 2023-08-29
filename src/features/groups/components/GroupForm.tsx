import {useCreateGroup} from "../hooks/mutation/useCreateGroup";
import {Group, MutateGroupInput} from "../types";
import {FC} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../../../RootRoutes";
import {useNavigation} from "@react-navigation/native";
import {Form, InputField, TInputFieldProps} from "../../../components";
import {View} from "react-native";
import {useEditGroup} from "../hooks/mutation/useEditGroup";

type Props = NativeStackScreenProps<RootRoutesParamList, 'GroupForm'>;

export const GroupForm: FC<Props> = (props) => {
    const {onSubmit, defaultValues} = useGroupForm(props)
    const inputFields: TInputFieldProps<MutateGroupInput>[] = [
        {placeholder: "グループ名", name: "groupName", rules: {required: true}},
        {placeholder: "グループ説明", name: "groupRemarks", rules: {required: true}},
    ]
    return (
        <View style={{flex: 1}}>
            <Form<MutateGroupInput> onSubmit={onSubmit} inputFields={inputFields} defaultValues={defaultValues}/>
        </View>
    )
}

const useGroupForm = ({navigation, route}: Props) => {
    const {mutateAsync, isSuccess} = useCreateGroup()
    const {mutateAsync: editGroup, isSuccess: isSuccessEdit} = useEditGroup()
    const group = route.params?.group
    const onSubmit = async (data: MutateGroupInput) => {
        if (group === undefined) {
            await mutateAsync(data)
        } else {
            await editGroup({input: data, groupId: group?.groupId})
        }
        navigation.goBack()
    };
    const defaultValues: MutateGroupInput | undefined = group && {
        groupName: group.groupName,
        groupRemarks: group.groupRemarks
    }

    return {
        onSubmit,
        defaultValues
    }
}