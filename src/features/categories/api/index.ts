import {instance} from "../../../lib/axios";
import {AxiosResponse} from "axios";
import {CreateGroupInput, Group} from "../../groups/types";

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