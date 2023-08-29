import {instance} from "../../../lib/axios";
import {AxiosResponse} from "axios";
import {MutateGroupInput, Group} from "../../groups/types";

type GetCategoriesResponse = {
    categories: Category[]
}
export const getCategories = async (groupId: string): Promise<Category[]> => {
    const res: AxiosResponse<GetCategoriesResponse> = await instance.get(`/groups/${groupId}/categories`)
    return res.data.categories
}

export const createCategory = async (input: CreateCategoryInput): Promise<Category> => {
    const res: AxiosResponse<Category> = await instance.post("/categories", input)
    return res.data
}

export const updateCategory = async (params: {categoryId: string, input: UpdateCategoryInput}): Promise<Category> => {
    const res: AxiosResponse<Category> = await instance.put(`/categories/${params.categoryId}`, params.input)
    return res.data
}
export const deleteCategory = async (categoryId: string): Promise<{categoryId: string}> => {
    const res: AxiosResponse<{categoryId: string}> = await instance.delete(`/categories/${categoryId}`)
    return res.data
}