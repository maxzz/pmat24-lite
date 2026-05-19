import { atom } from "jotai";
import { appSettings } from "../9-ui-state/0-local-storage-app";
import { allFileUsChanges } from "../2-file-mani-atoms/9-types";
import { confirmCloseFolderMessages, doAsyncExecuteConfirmDialogAtom } from "../4-dialogs-atoms/5-confirm-atoms";
import { doSetDeliveredFilesAtom } from "@/store/0-serve-atoms/1-do-set-files";
import { inTest_DeleteDir } from "@/store/0-serve-atoms/6-do-in-use-test";
import { undefinedPmatFolder } from "@/store/5-1-open-files";

export const doCloseRootDirAtom = atom(
    null,
    async (get, set): Promise<boolean> => {
        const { confirmExit } = appSettings.appUi.uiAdvanced;

        // #region agent log: doCloseRootDirAtom entry
        fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_CLOSE', location: 'src/renderer/src/store/5-1-open-files/3-close-root-dir.ts:doCloseRootDirAtom:entry', message: 'doCloseRootDirAtom entry', data: { confirmExit, hasUnsavedChanges: !!allFileUsChanges.size, unsavedChangesCnt: allFileUsChanges.size }, timestamp: Date.now() }) }).catch(() => { });
        // #endregion

        try {
            const okToClose = await asyncConfirmToCloseUnsavedFolder(confirmExit, set);
            if (!okToClose) {
                // #region agent log: doCloseRootDirAtom cancelled
                fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_CLOSE', location: 'src/renderer/src/store/5-1-open-files/3-close-root-dir.ts:doCloseRootDirAtom:cancelled', message: 'doCloseRootDirAtom cancelled', data: { confirmExit, unsavedChangesCnt: allFileUsChanges.size }, timestamp: Date.now() }) }).catch(() => { });
                // #endregion
                return false;
            }

            set(doSetDeliveredFilesAtom, {
                deliveredFileContents: undefined,
                root: undefinedPmatFolder(),
                noItemsJustDir: false,
                error: undefined,
            });

            await inTest_DeleteDir();
            return true;
        } catch (error) {
            // #region agent log: doCloseRootDirAtom exception
            fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_CLOSE', location: 'src/renderer/src/store/5-1-open-files/3-close-root-dir.ts:doCloseRootDirAtom:exception', message: 'doCloseRootDirAtom exception', data: error instanceof Error ? { message: error.message, stack: error.stack } : { errorType: typeof error, error: String(error) }, timestamp: Date.now() }) }).catch(() => { });
            // #endregion
            throw error;
        }
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
