import {useGroups} from "../hooks/query/useGroups";
import {View, Text, Button, StyleSheet, ScrollView} from "react-native";
import {Card, Icon, ListItem} from '@rneui/themed';
import {BaseCard} from "../../../components";
import {PlusIcon} from "../../categories/components/PlusIcon";

type GroupListProps = {
    onPressGroup: (groupId: string) => void;
}
export const GroupList = (props: GroupListProps) => {

    const {data = [], isLoading, onPressGroup} = useGroupList(props)

    if (isLoading) return <Text>Loading ...</Text>
    return (
        <View style={style.GroupList}>
            <ScrollView>
                <View>
                    {
                        data.map((group, i) => (
                                <BaseCard key={i} onPress={() => onPressGroup(group.groupId)} title={group.groupName}
                                          subTitle={group.groupRemarks}/>
                            )
                        )
                    }
                </View>
            </ScrollView>
        </View>

    )
}

const useGroupList = ({onPressGroup}: GroupListProps) => {
    const {data, isLoading} = useGroups()
    return {
        data,
        isLoading,
        onPressGroup
    }
}

const style = StyleSheet.create({
    GroupList: {
        flex: 1,
    },
})
