import {useItems, useStatuses} from "../hooks/query";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import {BaseCard} from "../../../components";
import {useEffect, useState} from "react";
import {Card, Icon, ListItem, Overlay} from "@rneui/themed";
import {ChangeStatus} from "./ChangeStatus";

type ItemListProps = {
    categoryId: string
}
export const ItemList = (props: ItemListProps) => {
    const {
        displayItems,
        dataLoading,
        changeStatus,
        openChangeStatusModal,
        changeStatusTargetId,
        statuses = [],
        setChangeStatus
    } = useItemList(props)

    if (dataLoading) return <Text>Loading ...</Text>
    return (
        <View style={style.itemList}>
            <ScrollView>
                <View>
                    {
                        displayItems.map((item, i) => (
                                <Card containerStyle={{padding: 0}} key={i}>
                                    <ListItem containerStyle={{backgroundColor: item.statusColorCode}} onPress={() => {
                                        openChangeStatusModal(item.id)
                                    }}>
                                        <View style={style.Item__Content}>
                                            <ListItem.Content>
                                                <ListItem.Title
                                                    style={style.Item__Title}>{item.name}</ListItem.Title>
                                                <ListItem.Subtitle
                                                    style={style.Item__SubTitle}>{item.remarks}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <Icon type={"ionicon"} name={"chevron-down-circle-outline"} size={35}/>
                                        </View>
                                    </ListItem>
                                </Card>
                            )
                        )
                    }
                </View>
            </ScrollView>
            <Overlay isVisible={changeStatus && changeStatusTargetId !== null} onBackdropPress={() => {
                setChangeStatus(false)
            }} overlayStyle={{height: 500, width: 300}}>
                <ChangeStatus close={() => {
                    setChangeStatus(false)
                }} statuses={statuses} itemId={changeStatusTargetId} categoryId={props.categoryId}/>
            </Overlay>
        </View>
    )
}

type DisplayItem = {
    id: string;
    name: string;
    remarks: string;
    statusColorCode?: string;
    statusId?: string
}
const useItemList = ({categoryId}: ItemListProps) => {
    const {data: items, isLoading: itemLoading} = useItems(categoryId)
    const {data: statuses, isLoading: statusLoading, isFetching} = useStatuses(categoryId)
    const [displayItems, setDisplayItems] = useState<DisplayItem[]>([])
    const [changeStatus, setChangeStatus] = useState(false)
    const [changeStatusTargetId, setChangeStatusTargetId] = useState<string | null>(null)
    const dataLoading = itemLoading || statusLoading

    useEffect(() => {
        const di: DisplayItem[] = items?.map(item => {
            const status = statuses?.find(status => status.statusId === item.statusId)
            return {
                id: item.itemId,
                name: item.itemName,
                remarks: item.itemRemarks ?? "",
                statusColorCode: status?.statusColor && `${status.statusColor}`,
                statusId: status?.statusId
            }
        }) ?? []
        console.log(di)
        setDisplayItems(di)
    }, [items])

    const openChangeStatusModal = (itemId: string) => {
        setChangeStatusTargetId(itemId)
        setChangeStatus(true)
    }
    return {
        displayItems,
        dataLoading,
        changeStatus,
        statuses,
        openChangeStatusModal,
        changeStatusTargetId,
        setChangeStatus
    }
}

const style = StyleSheet.create({
    itemList: {
        flex: 1
    },
    Item__Title: {
        fontSize: 24
    },
    Item__SubTitle: {
        fontSize: 12
    },
    Item__Content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
})