import {
    MutateOption,
    QUERY_KEYS,
    queryClient,
    QueryOption,
    useMutationWrapper,
    useQueryWrapper
} from "../../../../lib/react-query";
import {createCategory, updateCategory} from "../../api";


export const useUpdateCategory = (groupId: string, option?: MutateOption<Category, {categoryId: string, input: UpdateCategoryInput}>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: updateCategory,
        onSuccess: (data, variables, context) => {
            const prev = queryClient.getQueryData<Category[]>([QUERY_KEYS.CATEGORIES, groupId]) ?? []
            const newCategories: Category[] = prev.map(c => c.categoryId === data.categoryId ? data : c)
            queryClient.setQueryData([QUERY_KEYS.CATEGORIES, groupId], newCategories)
        },
    })
}