export type Group = {
    groupId: string,
    groupName: string,
    groupRemarks: string
}

export type MutateGroupInput = {
    groupName: string,
    groupRemarks?: string
}
