import {instance} from "../../../lib/axios";
import {MutateGroupInput, Group} from "../types";
import {AxiosResponse} from "axios";
import {GetGroupsResponse} from "./response";

export const getGroups = async (): Promise<Group[]> => {
    const res: AxiosResponse<GetGroupsResponse> = await instance.get("/groups")
    return res.data.groups.map(g => {
        return {
            ...g
        }
    })
}

export const createGroup = async (input: MutateGroupInput): Promise<Group> => {
    const res: AxiosResponse<Group> = await instance.post("/groups", input)
    return res.data
}

export const updateGroup = async (param: {input: MutateGroupInput, groupId: string}): Promise<Group> => {
    const res: AxiosResponse<Group> = await instance.put(`/groups/${param.groupId}`, param.input)
    return res.data
}

export const deleteGroup = async (groupId: string): Promise<{groupId: string}> => {
    const res: AxiosResponse<{groupId: string}> = await instance.delete(`/groups/${groupId}`)
    return res.data
}