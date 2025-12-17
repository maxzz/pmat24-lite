import { Order, SortBy } from "@/store/store-types";

// Files sort by and order

export type FilesSortOrder = {
    sortBy: SortBy;
    order: Order;
};

export const defaultFilesSortOrder: FilesSortOrder = {
    sortBy: SortBy.loginName,
    // order: Order.highToLow,
    order: Order.lowToHigh,
};
