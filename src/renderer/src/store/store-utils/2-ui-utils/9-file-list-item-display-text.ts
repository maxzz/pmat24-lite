import { type FileUs } from "@/store/store-types";
import { type FileListItemsState } from "../../9-ui-state/1-files-list/3-ui-file-items";

export function getTreeItemDisplayText(fileUs: FileUs, options: FileListItemsState, chooseName: string) {
    const { showChosen, showFname } = options;

    const name =
        showFname
            ? fileUs.fileCnt.fname
            : showChosen
                ? chooseName
                : fileUs.parsedSrc.stats.loginFormDomain;

    return name || fileUs.fileCnt.fname;
}
