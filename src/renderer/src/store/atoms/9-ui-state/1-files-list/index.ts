import { ShownManis, defaultShownManis } from "./03-shown-files";
import { FilesSortOrder, defaultFilesSortOrder } from "./05-files-sort-order";
import { FileListItemsState, defaultFileListItemsState } from "./07-ui-file-items";

export type FileListOptions = {
    shownManis: ShownManis;
    filesSortOrder: FilesSortOrder;
    fileListItems: FileListItemsState;
};

export const defaultFileListOptions: FileListOptions = {
    shownManis: defaultShownManis,
    filesSortOrder: defaultFilesSortOrder,
    fileListItems: defaultFileListItemsState,
};
