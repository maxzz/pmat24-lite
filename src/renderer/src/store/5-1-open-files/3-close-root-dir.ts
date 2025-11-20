import { atom } from "jotai";
import { appSettings } from "../9-ui-state/0-local-storage-app";
import { allFileUsChanges } from "../2-file-mani-atoms/9-types";
import { confirmCloseFolderMessages, doAsyncExecuteConfirmDialogAtom } from "../4-dialogs-atoms/5-confirm-atoms";
import { doSetDeliveredFilesAtom } from "@/store/0-serve-atoms/1-do-set-files";
import { inTest_DeleteDir } from "@/store/0-serve-atoms/6-do-inuse-test";
import { undefinedPmatFolder } from "@/store/5-1-open-files";

export const doCloseRootDirAtom = atom(
    null,
    async (get, set) => {
        const { confirmExit } = appSettings.appUi.uiAdvanced;

        if (!await asyncConfirmToCloseUnsavedFolder(confirmExit, set)) {
            return;
        }

        set(doSetDeliveredFilesAtom, {
            deliveredFileContents: undefined,
            root: undefinedPmatFolder(),
            noItemsJustDir: false,
            error: undefined,
        });

        await inTest_DeleteDir();
    }
);

async function asyncConfirmToCloseUnsavedFolder(confirmExit: boolean, set: Setter): Promise<boolean> {
    if (allFileUsChanges.size) {
        const ok = !confirmExit || await set(doAsyncExecuteConfirmDialogAtom, confirmCloseFolderMessages);
        if (!ok) {
            return false;
        }
    }
    return true;
}
