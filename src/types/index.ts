import {GroupDetail} from "../features/groups/types";

export type GroupInfo = GroupDetail & {
    categories: Category[]
}