import {MutateOption, QUERY_KEYS, queryClient, useMutationWrapper} from "../../../../lib/react-query";
import {AssignStatusInput, CreateItemInput, CreateStatusInput, Item, Status} from "../../types";
import {assignStatus, createItem, createStatus, deleteItem} from "../../api";

export const useCreateItem = (option?: MutateOption<Item, CreateItemInput>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: createItem,
        onSuccess: (data, variables, context) => {
            const prevItems = queryClient.getQueryData<Item[]>([QUERY_KEYS.ITEMS]) ?? []
            const newItems: Item[] = [
                data,
                ...prevItems
            ]
            queryClient.setQueryData<Item[]>([QUERY_KEYS.ITEMS], newItems)
        },
    })
}

export const useDeleteItem = (option?: MutateOption<{itemId: string}, string>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: deleteItem,
        onSuccess: (data, variables, context) => {
            const prev = queryClient.getQueryData<Item[]>([QUERY_KEYS.ITEMS]) ?? []
            const newItems: Item[] = prev.filter(i => i.itemId !== variables)
            queryClient.setQueryData([QUERY_KEYS.ITEMS], newItems)
        },
    })
}

export const useCreateStatus = (option?: MutateOption<Status, CreateStatusInput>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: createStatus,
        onSuccess: (data, variables, context) => {
            const prevStatus = queryClient.getQueryData<Status[]>([QUERY_KEYS.STATUSES]) ?? []
            const newStatus: Status[] = [
                data,
                ...prevStatus
            ]
            queryClient.setQueryData<Status[]>([QUERY_KEYS.STATUSES], newStatus)
        },
    })
}

export const useAssignStatus = (option?: MutateOption<Item, { itemId: string, input: AssignStatusInput }>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: assignStatus,
        onSuccess: async (response, input) => {
            const prevItems = queryClient.getQueryData<Item[]>([QUERY_KEYS.ITEMS]) ?? []
            const newItems: Item[] = prevItems.map(item => {
                if (item.itemId !== response.itemId) return item;
                return {
                    ...item,
                    statusId: response.statusId
                }
            })
            queryClient.setQueryData<Item[]>([QUERY_KEYS.ITEMS], newItems)
        },
    })
}
