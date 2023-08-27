import {View, Text, ScrollView, StyleSheet} from "react-native";
import {FC, useState} from "react";
import {CreateStatusInput, Status} from "../types";
import {Button, Icon, ListItem} from "@rneui/themed";
import {useAssignStatus, useCreateStatus} from "../hooks/mutaition";
import {appColor} from "../../../shared/styles";
import {CreateStatus} from "./CreateStatus";

type Props = {
    close: () => void,
    statuses: Status[],
    itemId: string | null,
    categoryId: string
}
export const ChangeStatus: FC<Props> = ({close, statuses, itemId, categoryId}) => {
    const [isFormView, setIsFormView] = useState(false)
    const {mutateAsync} = useAssignStatus()
    const {mutateAsync: createStatus} = useCreateStatus()
    if (itemId === null) {
        close()
        return <></>
    }

    const onSubmit = (statusId: string) => {
        mutateAsync(
            {
                itemId,
                input: {statusId}
            }
        ).then(() => {
            close()
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <View style={style.container}>
            {
                !isFormView ?
                    <View style={style.statuses}>
                        <Text>アイテムのステータスを変更する</Text>
                        <ScrollView>
                            {
                                statuses.map((s, i) => (
                                    <Button
                                        buttonStyle={{backgroundColor: `${s.statusColor}`, marginTop: 8}}
                                        onPress={() => {
                                            onSubmit(s.statusId)
                                        }}
                                    >{s.statusName}</Button>
                                ))
                            }
                        </ScrollView>
                        <Button buttonStyle={style.addButton} color={appColor} onPress={() => setIsFormView(true)}>
                            <Icon type={"ionicon"} name={"add-circle-outline"} color={"white"} size={25}/>
                            <Text style={style.addButton__Text}>追加</Text>
                        </Button>
                    </View> :
                    <CreateStatus close={() => setIsFormView(false)} categoryId={categoryId}/>
            }
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    statuses: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between"
    },
    addButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    addButton__Text: {
        color: "#fff",
        fontWeight: "bold"
    }
})