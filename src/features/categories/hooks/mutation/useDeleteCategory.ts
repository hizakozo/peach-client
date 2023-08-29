import {MutateOption, QUERY_KEYS, queryClient, useMutationWrapper} from "../../../../lib/react-query";
import {deleteCategory} from "../../api";

export const useDeleteCategory = (option?: MutateOption<{categoryId: string}, string>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: deleteCategory,
        onSuccess: (data, variables, context) => {
            const prev = queryClient.getQueryData<Category[]>([QUERY_KEYS.CATEGORIES]) ?? []
            const newCategories: Category[] = prev.filter(c => c.categoryId !== variables)
            queryClient.setQueryData([QUERY_KEYS.CATEGORIES], newCategories)
        },
    })
}