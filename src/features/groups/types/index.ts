export type Group = {
    groupId: string,
    groupName: string,
    groupRemarks: string
}

export type CreateGroupInput = {
    groupName: string,
    groupRemarks?: string
}
