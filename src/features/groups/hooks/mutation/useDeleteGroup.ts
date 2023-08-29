import {
    MutateOption,
    QUERY_KEYS,
    queryClient,
    useMutationWrapper
} from "../../../../lib/react-query";
import {Group} from "../../types";
import {deleteGroup} from "../../api";



export const useDeleteGroup = (option?: MutateOption<{groupId: string}, string>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: deleteGroup,
        onSuccess: (data, variables, context) => {
            const prev = queryClient.getQueryData<Group[]>([QUERY_KEYS.GROUPS]) ?? []
            const newGroups: Group[] = prev.filter(g => g.groupId !== variables)
            queryClient.setQueryData([QUERY_KEYS.GROUPS], newGroups)
        },
    })
}