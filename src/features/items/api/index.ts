import {AxiosResponse} from "axios";
import {instance} from "../../../lib/axios";
import {AssignStatusInput, CreateItemInput, CreateStatusInput, Item, Status} from "../types";

type GetItemsResponse = {
    items: Item[]
}
export const getItems = async (categoryId: string): Promise<Item[]> => {
    const res: AxiosResponse<GetItemsResponse> = await instance.get(`/categories/${categoryId}/items`)
    return res.data.items
}

export const createItem = async (input: CreateItemInput): Promise<Item> => {
    const res: AxiosResponse<Item> = await instance.post("/items", input)
    return res.data
}

type GetStatusesResponse = {
    statuses: Status[]
}
export const getStatuses = async (categoryId: string): Promise<Status[]> => {
    const res: AxiosResponse<GetStatusesResponse> = await instance.get(`/categories/${categoryId}/statuses`)
    return res.data.statuses
}

export const createStatus = async (input: CreateStatusInput): Promise<Status> => {
    const res: AxiosResponse<Status> = await instance.post("/statuses", input)
    return res.data
}

export const assignStatus = async ({itemId, input}: {itemId: string, input: AssignStatusInput}): Promise<Item> => {
    const res: AxiosResponse<Item> = await instance.post(`/items/${itemId}/assignStatus`, input)
    return res.data
}