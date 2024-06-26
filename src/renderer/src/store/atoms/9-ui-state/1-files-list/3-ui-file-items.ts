import { UISize } from "@/store/store-types";

export type FileListItemsState = {
    itemSize: UISize;       // UI files list items size
    showIndex: boolean;     // Show index in the list
    showChosen: boolean;    // Show domain in the list over the chosen name from manifest
};

export const defaultFileListItemsState: FileListItemsState = {
    itemSize: UISize.normal,
    showIndex: false,
    showChosen: false,
};
