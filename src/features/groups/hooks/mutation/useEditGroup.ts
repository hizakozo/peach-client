import {MutateOption, QUERY_KEYS, queryClient, useMutationWrapper} from "../../../../lib/react-query";
import {MutateGroupInput, Group} from "../../types";
import {createGroup, updateGroup} from "../../api";

export const useEditGroup = (option?: MutateOption<Group, { input: MutateGroupInput, groupId: string }>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: updateGroup,
        onSuccess: (data, variables, context) => {
            const prevGroups = queryClient.getQueryData<Group[]>([QUERY_KEYS.GROUPS]) ?? []
            const newGroups: Group[] = prevGroups.map(g => g.groupId === data.groupId ? data : g)
            queryClient.setQueryData([QUERY_KEYS.GROUPS], newGroups)
        },
    })
}