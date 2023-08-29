import {QUERY_KEYS, QueryOption, useQueryWrapper} from "../../../../lib/react-query";
import {Group, GroupDetail} from "../../types";
import {getGroupDetail, getGroups} from "../../api";

type TQueryFnData = Group[]
export const useGroups = (option?: QueryOption<TQueryFnData>) => {
    return useQueryWrapper({
        ...option,
        queryKey: [QUERY_KEYS.GROUPS],
        queryFn: () => getGroups()
    })
}

export const useGroupDetail = (groupId: string, option?: QueryOption<GroupDetail>) => {
    return useQueryWrapper({
        ...option,
        queryKey: [QUERY_KEYS.GROUP_DETAIL, groupId],
        queryFn: () => getGroupDetail(groupId)
    })
}