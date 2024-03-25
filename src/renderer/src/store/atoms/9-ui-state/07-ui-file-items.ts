import { UISize } from "@/store/store-types";
import { proxy } from "valtio";

export type FileListItemsState = {
    itemSize: UISize;       // UI files list items size
    showIndex: boolean;     // Show index in the list
};

export const defaultFileListItemsState: FileListItemsState = {
    itemSize: UISize.normal,
    showIndex: false,
};

export const fileListItemsState = proxy<FileListItemsState>(defaultFileListItemsState);
