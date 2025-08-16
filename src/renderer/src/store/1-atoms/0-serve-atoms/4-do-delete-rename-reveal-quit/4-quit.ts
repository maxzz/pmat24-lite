import { atom } from "jotai";
import { appSettings } from "@/store/9-ui-state";
import { confirmQuitMessages, doAsyncExecuteConfirmDialogAtom } from "@/store/4-dialogs-atoms";
import { R2MCalls } from "@/xternal-to-main";

export const doQuitFromMainAtom = atom(null,
    async (get, set) => {
        const { confirmExit } = appSettings.appUi.uiAdvanced;

        const ok = !confirmExit || await set(doAsyncExecuteConfirmDialogAtom, confirmQuitMessages);
        if (!ok) {
            return;
        }
        R2MCalls.setModifiedFilesState(false);
        R2MCalls.closeAppFromRenderer();
    }
);
