import {View, Text, ScrollView, StyleSheet} from "react-native";
import {FC} from "react";
import {Status} from "../types";
import {Button, ListItem} from "@rneui/themed";
import {useAssignStatus} from "../hooks/mutaition";

type Props = {
    close: () => void,
    statuses: Status[],
    itemId: string | null
}
export const ChangeStatus: FC<Props> = ({close, statuses, itemId}) => {
    const {mutateAsync} = useAssignStatus()
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
            <ScrollView style={style.statuses}>
                {
                    statuses.map((s, i) => (
                        <Button
                            buttonStyle={{backgroundColor: `#${s.statusColor}`, marginTop: 8}}
                            onPress={() => {
                                onSubmit(s.statusId)
                            }}
                        >{s.statusName}</Button>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    statuses: {}
})