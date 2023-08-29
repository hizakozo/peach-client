import {MutateOption, QUERY_KEYS, queryClient, useMutationWrapper} from "../../../../lib/react-query";
import {deleteCategory} from "../../api";

export const useDeleteCategory = (groupId: string, option?: MutateOption<{categoryId: string}, string>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: deleteCategory,
        onSuccess: (data, variables, context) => {
            console.log(groupId)
            const prev = queryClient.getQueryData<Category[]>([QUERY_KEYS.CATEGORIES, groupId]) ?? []
            const newCategories: Category[] = prev.filter(c => c.categoryId !== variables)
            queryClient.setQueryData([QUERY_KEYS.CATEGORIES, groupId], newCategories)
        },
    })
}