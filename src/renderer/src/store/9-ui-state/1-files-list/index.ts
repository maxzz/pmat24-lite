import { Order, SortBy } from "@/store/store-types";

// Sort by and order

export type FilesSortOrder = {
    sortBy: SortBy;
    order: Order;
};

export const defaultFilesSortOrder: FilesSortOrder = {
    sortBy: SortBy.loginName,
    // order: Order.highToLow,
    order: Order.lowToHigh,
};

// File list items

export type FileListItemsState = {
    showIndex: boolean;         // Show index in the list
    showFname: boolean;         // Show file name only; other option variations: show file name for win apps; choosen name; domain;
    showChosen: boolean;        // Show domain in the list over the chosen name from manifest
    showIeMarker: boolean;      // Show IE marker for web manifests
    showCpassMarker: boolean;   // Show Password Change marker on tree items

    selectAsTrigger: boolean;   // click on selected item will deselect it; and no deselecting on click on empty space.
    selectEmptySpace: boolean;  // click on empty space will deselect current item
};

export const defaultFileListItemsState: FileListItemsState = {
    showIndex: false,
    showFname: false,
    showChosen: true,
    showIeMarker: true,
    selectAsTrigger: false,
    selectEmptySpace: false,
    showCpassMarker: true,
};

// Shown manifests

export type ShownManis = { // currently shown manifests
    showNormal: boolean;
    showManual: boolean;
    showEmpty: boolean;
    fcAllowed: boolean;    // Allow field catalog access
};

export const defaultShownManis: ShownManis = {
    showNormal: true,
    showManual: true,
    showEmpty: true,
    fcAllowed: false,
};

// All together

export type FileListSettings = {
    shownManis: ShownManis;             // Currently shown manifests filter options
    sortOrder: FilesSortOrder;          // Files sort by and order options
    itemsState: FileListItemsState;     // Files list item render options
};

export const defaultFileListSettings: FileListSettings = {
    shownManis: defaultShownManis,
    sortOrder: defaultFilesSortOrder,
    itemsState: defaultFileListItemsState,
};
