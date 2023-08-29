// group情報編集ページ
// groupの削除
// groupは以下のカテゴリの削除、編集
// 招待コードの登録、編集
// ユーザーの削除
// グループ作成者のみがそうさできる
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootRoutesParamList} from "../RootRoutes";
import {FC, useEffect, useState} from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import {Button, Card, Icon, ListItem} from "@rneui/themed";
import {useCategories} from "../features/categories/hooks/query/useCategories";
import {useGroupDetail} from "../features/groups/hooks/query/useGroups";
import {useDeleteCategory} from "../features/categories/hooks/mutation/useDeleteCategory";
import {useNotificationDialog} from "../provider/NotificationDialogProvider";
import {useDeleteGroup} from "../features/groups/hooks/mutation/useDeleteGroup";

type Props = NativeStackScreenProps<RootRoutesParamList, 'GroupInfo'>;

export const GroupInfo: FC<Props> = (props) => {
    const {groupDetail, categories, isLoading, onPressCategoryTrash, onPressDeleteGroupButton} = useGroupInfo(props)
    if (isLoading || groupDetail === undefined || categories === undefined) return <Text>Loading ...</Text>
    return (
        <ScrollView style={style.groupInfo}>
            <View style={style.groupInfo__Group}>
                <Card>
                    <Card.Title>グループ情報</Card.Title>
                    <Text>グループ名: {groupDetail.groupName}</Text>
                    <Text>グループ説明: {groupDetail.groupRemarks}</Text>
                    <View style={style.groupInfo__InviteGroup}>
                        <Text>招待コード: <Text style={style.groupInfo__InviteCode}>{groupDetail.inviteCode}</Text></Text>
                        <Icon raised type={"ionicon"} name={"create-outline"} size={17}
                              onPress={() => {
                                  props.navigation.navigate("CreateGroupInvite", {groupId: groupDetail?.groupId})
                              }}/>
                    </View>
                </Card>
            </View>
            <Card containerStyle={style.groupInfo__Categories} wrapperStyle={{flex: 1}}>
                <Card.Title>カテゴリ</Card.Title>
                <ScrollView>
                    {
                        categories.map((category, i) => (
                            <ListItem bottomDivider key={i}>
                                <ListItem.Content>
                                    <ListItem.Title>{category.categoryName}</ListItem.Title>
                                </ListItem.Content>
                                <Icon raised type={"ionicon"} name={"pencil-outline"} size={17}
                                      onPress={() => props.navigation.navigate("CategoryForm", {
                                          category,
                                          groupId: groupDetail?.groupId
                                      })}/>
                                <Icon raised type={"ionicon"} name={"trash-outline"} size={17}
                                      onPress={() => {
                                          onPressCategoryTrash(category)
                                      }}/>
                            </ListItem>
                        ))
                    }
                </ScrollView>
            </Card>
            <Card containerStyle={style.groupInfo__Users}>
                <Card.Title>所属ユーザー</Card.Title>
                <ScrollView>
                    {
                        groupDetail.users.map((gu, i) => (
                            <View key={i}>
                                <Text>{gu.userName}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </Card>
            <Button containerStyle={style.groupInfo__DeleteButton} color={"#c0c0c0"}
                    onPress={() => onPressDeleteGroupButton()}
            >このグループを削除</Button>
        </ScrollView>
    )
}

export const useGroupInfo = ({navigation, route}: Props) => {
    const groupId = route.params.groupId
    const {data: groupDetail, isLoading: groupLoading} = useGroupDetail(groupId)
    const {data: categories, isLoading: categoriesLoading} = useCategories(groupId)
    const {mutateAsync: deleteCategory} = useDeleteCategory(groupId)
    const {mutateAsync: deleteGroup} = useDeleteGroup()
    const {openNotifier} = useNotificationDialog()
    const isLoading = groupLoading || categoriesLoading

    const onPressCategoryTrash = (category: Category) => {
        const action = () => deleteCategory(category.categoryId)
        openNotifier({title: `カテゴリ「${category.categoryName}」を削除しますか？`, action})
    }
    const onPressDeleteGroupButton = () => {
        const action = () => {
            deleteGroup(groupId)
                .then(() => {
                    navigation.goBack();
                })
        }
        openNotifier({
            title: `このグループを削除しますか？`,
            description: "このグループ内のカテゴリやアイテム全てが削除されます。",
            action})
    }
    return {
        groupDetail,
        categories,
        isLoading,
        onPressCategoryTrash,
        onPressDeleteGroupButton
    }
}

const style = StyleSheet.create({
    groupInfo: {
        flex: 1,
    },
    groupInfo__Group: {
        // flex: 1
    },
    groupInfo__Categories: {
        flex: 2
    },
    groupInfo__Users: {
        flex: 1,
        marginTop: 10
    },
    groupInfo__DeleteButton: {
        flex: 1,
        marginTop: 10
    },
    groupInfo__InviteGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    groupInfo__InviteCode: {
    }
})