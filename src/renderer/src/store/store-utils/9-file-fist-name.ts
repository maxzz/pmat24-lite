import { FileUs } from "@/store/store-types";
import { FileListItemsState } from "../atoms/9-ui-state/1-files-list/3-ui-file-items";

export function getFileListDisplayName(fileUs: FileUs, options: FileListItemsState) {
    const { showChosen } = options;
    
    const name = showChosen ? fileUs.stats.title : fileUs.stats.domain;

    return name || fileUs.fname;
}
