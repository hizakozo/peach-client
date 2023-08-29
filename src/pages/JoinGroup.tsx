import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import {FC} from "react";
import {useCreateGroupInvite} from "../features/groups/hooks/mutation/useCreateGroupInvite";
import {Form, TInputFieldProps} from "../components";
import {CreateInviteInput, JoinInput} from "../features/groups/types";
import {View, Text} from "react-native";
import {useCreateGroupJoin} from "../features/groups/hooks/mutation/useCreateGroupJoin";

type Props = NativeStackScreenProps<RootRoutesParamList, 'JoinGroup'>;

export const JoinGroup: FC<Props> =({navigation}) => {
    const {mutateAsync} = useCreateGroupJoin()
    const inputFields: TInputFieldProps<JoinInput>[] = [
        {placeholder: "招待コード", name: "inviteCode", rules: {required: true}},
    ]
    const onSubmit = async (input: JoinInput) => {
        await mutateAsync(input)
        navigation.goBack()
    }
    return (
        <View style={{flex: 1}}>
            <Text>教えてもらった招待コードを入力してグループに参加する</Text>
            <Form<JoinInput> onSubmit={onSubmit} inputFields={inputFields}/>
        </View>
    )
}