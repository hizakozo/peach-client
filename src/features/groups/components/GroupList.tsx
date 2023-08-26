import {useGroups} from "../hooks/query/useGroups";
import {View, Text, Button, StyleSheet, ScrollView} from "react-native";
import {Card, Icon, ListItem} from '@rneui/themed';
import {GroupForm} from "./GroupForm";
import {FC, useState} from "react";
import {RootRoutesParamList} from "../../../RootRoutes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useLinkTo} from "@react-navigation/native";
import {BaseCard} from "../../../components";

type GroupListProps = {
    onPressGroup: (groupId: string) => void;
    openCreateForm: () => void
}
export const GroupList = (props: GroupListProps) => {

    const {data = [], isLoading, openCreateForm, onPressGroup} = useGroupList(props)

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
            <Icon containerStyle={style.GroupList__AddIconContainer} raised size={30} type="ionicon" name={"add"}
                  onPress={openCreateForm}/>
        </View>

    )
}

const useGroupList = ({onPressGroup, openCreateForm}: GroupListProps) => {
    const {data, isLoading} = useGroups()
    return {
        data,
        isLoading,
        openCreateForm,
        onPressGroup
    }
}

const style = StyleSheet.create({
    GroupList: {
        position: "relative",
        marginBottom: 100
    },
    GroupList__AddIconContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
})
