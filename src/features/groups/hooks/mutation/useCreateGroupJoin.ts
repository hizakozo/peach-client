import {MutateOption, QUERY_KEYS, queryClient, useMutationWrapper} from "../../../../lib/react-query";
import {MutateGroupInput, Group, CreateInviteInput, InviteGroup, GroupDetail, JoinInput} from "../../types";
import {createGroup, createInvite, createUserGroup, updateGroup} from "../../api";

export const useCreateGroupJoin = (option?: MutateOption<Group, JoinInput>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: createUserGroup,
        onSuccess: (data, variables, context) => {
            const prevGroups = queryClient.getQueryData<Group[]>([QUERY_KEYS.GROUPS]) ?? []
            const newGroups: Group[] = [
                data,
                ...prevGroups
            ]
            queryClient.setQueryData([QUERY_KEYS.GROUPS], newGroups)
        },
    })
}