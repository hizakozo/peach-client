import {QUERY_KEYS, QueryOption, useQueryWrapper} from "../../../../lib/react-query";
import {Group} from "../../types";
import {getGroups} from "../../api";

type TQueryFnData = Group[]
export const useGroups = (option?: QueryOption<TQueryFnData>) => {
    return useQueryWrapper({
        ...option,
        queryKey: [QUERY_KEYS.GROUPS],
        queryFn: () => getGroups()
    })
}