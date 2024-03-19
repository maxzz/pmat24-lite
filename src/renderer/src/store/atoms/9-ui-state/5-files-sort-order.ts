import { proxy } from "valtio";
import { Order, SortBy } from "@/store/store-types";

// import { atomWithCallback } from "@/hooks/atomsX";
// import { LocalStorageSave, } from "@/store/store-localstorage-save";
// import { LocalStorage } from "@/store/store-localstorage-load";
// import { proxy } from "valtio";

// // Files sort by and order

// export const sortByAtom = atomWithCallback<SortBy>(LocalStorage.initialData.sortBy, LocalStorageSave.save);
// export const orderAtom = atomWithCallback<Order>(LocalStorage.initialData.order, LocalStorageSave.save);

export type FilesSortOrder = {
    sortBy: SortBy;
    order: Order;
};

export const defaultFilesSortOrder: FilesSortOrder = {
    sortBy: SortBy.index,
    order: Order.highToLow,
};

export const filesSortOrder = proxy<FilesSortOrder>(defaultFilesSortOrder);
