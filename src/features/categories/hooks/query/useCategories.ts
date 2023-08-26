import {QUERY_KEYS, QueryOption, useQueryWrapper} from "../../../../lib/react-query";
import {getCategories} from "../../api";

type TQueryFnData = Category[]
export const useCategories = (groupId: string, option?: QueryOption<TQueryFnData>) => {
    return useQueryWrapper({
        ...option,
        queryKey: [QUERY_KEYS.CATEGORIES],
        queryFn: () => getCategories(groupId)
    })
}