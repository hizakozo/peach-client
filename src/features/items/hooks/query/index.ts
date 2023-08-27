import {QUERY_KEYS, QueryOption, useQueryWrapper} from "../../../../lib/react-query";
import {Item, Status} from "../../types";
import {getItems, getStatuses} from "../../api";


export const useItems = (categoryId: string, option?: QueryOption<Item[]>) => {
    return useQueryWrapper({
        ...option,
        queryKey: [QUERY_KEYS.ITEMS],
        queryFn: () => getItems(categoryId)
    })
}

export const useStatuses = (categoryId: string, option?: QueryOption<Status[]>) => {
    return useQueryWrapper({
        ...option,
        queryKey: [QUERY_KEYS.STATUSES],
        queryFn: () => getStatuses(categoryId)
    })
}