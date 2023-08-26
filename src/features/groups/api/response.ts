export type GetGroupsResponse = {
    groups: GetGroupResponse[]
}
export type GetGroupResponse = {
    groupId: string,
    groupName: string,
    groupRemarks: string,
}