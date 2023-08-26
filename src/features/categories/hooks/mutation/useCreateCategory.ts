import {
    MutateOption,
    QUERY_KEYS,
    queryClient,
    QueryOption,
    useMutationWrapper,
    useQueryWrapper
} from "../../../../lib/react-query";
import {createCategory} from "../../api";


export const useCreateCategory = (option?: MutateOption<Category, CreateCategoryInput>) => {
    return useMutationWrapper({
        ...option,
        mutationFn: createCategory,
        onSuccess: (data, variables, context) => {
            const prev = queryClient.getQueryData<Category[]>([QUERY_KEYS.CATEGORIES]) ?? []
            const newCategories: Category[] = [
                data,
                ...prev
            ]
            queryClient.setQueryData([QUERY_KEYS.CATEGORIES], newCategories)
        },
    })
}