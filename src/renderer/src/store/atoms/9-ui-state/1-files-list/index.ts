import { ShownManis, defaultShownManis } from "./03-shown-files";
import { FilesSortOrder, defaultFilesSortOrder } from "./05-files-sort-order";
import { FileListItemsState, defaultFileListItemsState } from "./07-ui-file-items";

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
