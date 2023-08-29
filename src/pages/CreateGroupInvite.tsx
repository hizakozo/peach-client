import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import {FC} from "react";
import {Form, TInputFieldProps} from "../components";
import {View} from "react-native";
import {CreateInviteInput} from "../features/groups/types";
import {useCreateGroupInvite} from "../features/groups/hooks/mutation/useCreateGroupInvite";

type Props = NativeStackScreenProps<RootRoutesParamList, 'CreateGroupInvite'>;
export const CreateGroupInvite: FC<Props> = ({route, navigation}) => {

    const {mutateAsync} = useCreateGroupInvite()
    const inputFields: TInputFieldProps<CreateInviteInput>[] = [
        {placeholder: "招待コード", name: "inviteCode", rules: {required: true}},
    ]
    const groupId = route.params.groupId
    const onSubmit = async (input: CreateInviteInput) => {
        const param = {
            groupId,
            input
        }
        await mutateAsync(param)
        navigation.goBack()
    }
    return (
        <View style={{flex: 1}}>
            <Form<CreateInviteInput> onSubmit={onSubmit} inputFields={inputFields}/>
        </View>
    )
}