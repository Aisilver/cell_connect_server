import { PaginatedData, Pagination } from "@shared/common";

export function PaginateFindAndCountData<Item> (items: Item[], total: number, pagination: Pagination): PaginatedData<Item> {
    const {limit, page} = pagination,
    
    totalPages = Math.ceil(total / limit),
    
    numberOfPagesLeft = totalPages - page > -1 ? totalPages - page : 0

    return {
        data: items,
        numberOfPagesLeft,
        limit,
        unitsLeft: Math.max(total - (page * limit), 0),
        page
    }
}