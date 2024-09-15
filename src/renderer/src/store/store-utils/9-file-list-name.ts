import { Getter } from "jotai";
import { FileUs } from "@/store/store-types";
import { FileListItemsState } from "../atoms/9-ui-state/1-files-list/3-ui-file-items";

export function getFileListDisplayName(fileUs: FileUs, options: FileListItemsState, get: Getter) {
    const { showChosen } = options;
    
    const name = showChosen ? get(fileUs.stats.loginFormChooseNameAtom) : fileUs.stats.loginFormDomain;

    return name || fileUs.fname;
}

//TODO: show file name for win apps; choosen name; domain;