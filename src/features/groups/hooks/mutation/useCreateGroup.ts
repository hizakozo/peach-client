import {
    MutateOption,
    QUERY_KEYS,
    queryClient,
    QueryOption,
    useMutationWrapper,
    useQueryWrapper
} from "../../../../lib/react-query";
import {CreateGroupInput, Group} from "../../types";
import {createGroup, getGroups} from "../../api";



export const useCreateGroup = (option?: MutateOption<Group, CreateGroupInput>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: createGroup,
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