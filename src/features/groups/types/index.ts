export type Group = {
    groupId: string,
    groupName: string,
    groupRemarks: string
}

export type MutateGroupInput = {
    groupName: string,
    groupRemarks?: string
}

export type GroupDetail = Group & InviteGroup & {
   users: GroupUser[]
}

export type InviteGroup = {
    groupId: string
    inviteCode?: string,
    termTo?: string,
    inviteBy?: string,
}

type GroupUser = {
    userId: string,
    userName: string
}
export type JoinInput = CreateInviteInput
export type CreateInviteInput = {
    inviteCode: string
}