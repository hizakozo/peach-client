export type Item = {
    itemId: string,
    statusId?: string,
    itemName: string,
    itemRemarks?: string,
    createdAt: string
}

export type CreateItemInput = {
    categoryId: string,
    itemName: string,
    itemRemarks: string
}

export type Status = {
    statusId: string,
    statusName: string,
    statusColor: string
}

export type CreateStatusInput = {
    categoryId: string,
    statusName: string,
    statusColor: string
}

export type AssignStatusInput = {
    statusId: string
}