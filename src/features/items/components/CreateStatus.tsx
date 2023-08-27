import {View, StyleSheet} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {CreateStatusInput} from "../types";
import {Button, Input} from "@rneui/themed";
import ColorPicker from "react-native-wheel-color-picker";
import {appColor} from "../../../shared/styles";
import {useCreateStatus} from "../hooks/mutaition";
import {FC} from "react";

type TInput = Omit<CreateStatusInput, "categoryId">
type Props = {
    close: () => void;
    categoryId: string;
}
export const CreateStatus: FC<Props> = ({categoryId, close}) => {
    const {control, handleSubmit, watch} = useForm<TInput>()
    const {mutateAsync} = useCreateStatus()
    const onSubmit = async (input: TInput) => {
        await mutateAsync({
            ...input,
            categoryId
        })
        close()
    }

    const statusName = watch("statusName")
    const statusColor = watch("statusColor")
    return (
        <View style={style.createStatus}>
            <Button
                buttonStyle={{backgroundColor: `${statusColor}`}}
            >{statusName || "sample"}</Button>
            <View style={style.createStatus__Form}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            placeholder={"ステータス名"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name={"statusName"}
                />
                <Controller
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, onBlur}}) => (
                        <ColorPicker
                            onColorChange={onChange}
                            gapSize={2}
                            swatches={false}
                        />
                    )}
                    name={"statusColor"}
                />
            </View>
            <Button buttonStyle={style.createStatus__Button} color={appColor} onPress={handleSubmit(onSubmit)}>登録</Button>
            <Button buttonStyle={style.createStatus__Button} color={"#bcbcbc"} onPress={() => close()}>キャンセル</Button>
        </View>
    )
}

const style = StyleSheet.create({
    createStatus: {
        flex: 1,
    },

    createStatus__Form: {
        flex: 1
    },
    createStatus__Button: {
        marginTop: 16
    }
})