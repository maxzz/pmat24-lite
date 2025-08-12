import { UISize } from "@/store/store-types";

export type FileListItemsState = {
    itemSize: UISize;           // UI files list items size
    showIndex: boolean;         // Show index in the list
    showFname: boolean;         // Show file name only; other option variations: show file name for win apps; choosen name; domain;
    showChosen: boolean;        // Show domain in the list over the chosen name from manifest
    showIeMarker: boolean;      // Show IE marker for web manifests
    showCpassMarker: boolean;   // Show Password Change marker on tree items

    selectAsTrigger: boolean;   // click on selected item will deselect it; and no deselecting on click on empty space.
    selectEmptySpace: boolean;  // click on empty space will deselect current item
};

export const defaultFileListItemsState: FileListItemsState = {
    itemSize: UISize.normal,
    showIndex: false,
    showFname: false,
    showChosen: false,
    showIeMarker: false,
    selectAsTrigger: false,
    selectEmptySpace: false,
    showCpassMarker: true,
};
