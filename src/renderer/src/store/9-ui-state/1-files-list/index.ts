import { type ShownManis, defaultShownManis } from "./1-shown-files";
import { type FilesSortOrder, defaultFilesSortOrder } from "./2-files-sort-order";
import { type FileListItemsState, defaultFileListItemsState } from "./3-ui-file-items";

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
