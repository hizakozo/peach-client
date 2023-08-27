import {useCreateGroup} from "../hooks/mutation/useCreateGroup";
import {CreateGroupInput} from "../types";
import {FC} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../../../RootRoutes";
import {useNavigation} from "@react-navigation/native";
import {Form, InputField, TInputFieldProps} from "../../../components";
import {View} from "react-native";

type Props = NativeStackScreenProps<RootRoutesParamList, 'GroupForm'>;

export const GroupForm: FC<Props> = ({navigation}) => {
    const {onSubmit} = useGroupForm()
    const inputFields: TInputFieldProps<CreateGroupInput>[] = [
        {placeholder: "グループ名", name: "groupName", rules: {required: true}},
        {placeholder: "グループ説明", name: "groupRemarks", rules: {required: true}},
    ]
    return (
        <View style={{flex: 1}}>
            <Form<CreateGroupInput> onSubmit={onSubmit} inputFields={inputFields}/>
        </View>
    )
}

const useGroupForm = () => {
    const {mutateAsync, isSuccess} = useCreateGroup()
    const navigation = useNavigation()
    const onSubmit = async (data: CreateGroupInput) => {
        await mutateAsync(data)
        navigation.goBack()
    };

    return {
        onSubmit,
    }
}