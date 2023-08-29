import {MutateOption, QUERY_KEYS, queryClient, useMutationWrapper} from "../../../../lib/react-query";
import {MutateGroupInput, Group, CreateInviteInput, InviteGroup, GroupDetail} from "../../types";
import {createGroup, createInvite, updateGroup} from "../../api";

export const useCreateGroupInvite = (option?: MutateOption<InviteGroup, { groupId: string, input: CreateInviteInput }>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: createInvite,
        onSuccess: (data, variables, context) => {
            const prevGroup = queryClient.getQueryData<GroupDetail>([QUERY_KEYS.GROUP_DETAIL, variables.groupId])
            if (prevGroup === undefined) return
            const newGroup: GroupDetail = {
                ...prevGroup,
                inviteCode: data.inviteCode,
                inviteBy: data.inviteBy,
                termTo: data.termTo
            }
            queryClient.setQueryData([QUERY_KEYS.GROUP_DETAIL, variables.groupId], newGroup)
        },
    })
}