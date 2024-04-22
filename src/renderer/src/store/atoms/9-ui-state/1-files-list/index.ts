import { ShownManis, defaultShownManis } from "./1-shown-files";
import { FilesSortOrder, defaultFilesSortOrder } from "./2-files-sort-order";
import { FileListItemsState, defaultFileListItemsState } from "./3-ui-file-items";

export type FileListSettings = {
    shownManis: ShownManis;
    sortOrder: FilesSortOrder;
    itemsState: FileListItemsState;
};

export const defaultFileListSettings: FileListSettings = {
    shownManis: defaultShownManis,
    sortOrder: defaultFilesSortOrder,
    itemsState: defaultFileListItemsState,
};
