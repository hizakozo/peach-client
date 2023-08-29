type Category = {
    categoryId: string,
    categoryName: string,
    categoryRemarks: string
}

type CreateCategoryInput = {
    groupId: string,
    categoryName: string,
    categoryRemarks: string
}

type UpdateCategoryInput = Omit<CreateCategoryInput, "groupId">