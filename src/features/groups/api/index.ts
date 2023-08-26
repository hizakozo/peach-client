import {instance} from "../../../lib/axios";
import {CreateGroupInput, Group} from "../types";
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

export const createGroup = async (input: CreateGroupInput): Promise<Group> => {
    const res: AxiosResponse<Group> = await instance.post("/groups", input)
    return res.data
}