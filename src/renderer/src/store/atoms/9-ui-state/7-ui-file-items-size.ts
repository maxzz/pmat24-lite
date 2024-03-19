import { UISize } from "@/store/store-types";
import { proxy } from "valtio";

// import { atomWithCallback } from "@/hooks/atomsX";
// import { UISize } from "@/store/store-types";
// import { LocalStorageSave, } from "@/store/store-localstorage-save";
// import { LocalStorage } from "@/store/store-localstorage-load";
// export const uiSizeAtom = atomWithCallback<UISize>(LocalStorage.initialData.uiSize, LocalStorageSave.save);

// UI files list items size

export type FileListItemsState = {
    itemSize: UISize;
};

export const defaultFileListItemsState: FileListItemsState = {
    itemSize: UISize.normal,
};

export const fileListItemsState = proxy<FileListItemsState>(defaultFileListItemsState);
