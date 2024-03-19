import { atomWithCallback } from "@/hooks/atomsX";
import { Order, SortBy } from "@/store/store-types";
import { LocalStorageSave, } from "@/store/store-localstorage-save";
import { LocalStorage } from "@/store/store-localstorage-load";

// Files sort by and order

export const sortByAtom = atomWithCallback<SortBy>(LocalStorage.initialData.sortBy, LocalStorageSave.save);
export const orderAtom = atomWithCallback<Order>(LocalStorage.initialData.order, LocalStorageSave.save);
