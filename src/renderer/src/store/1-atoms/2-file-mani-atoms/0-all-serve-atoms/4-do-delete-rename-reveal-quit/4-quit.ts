import { atom } from "jotai";
import { appSettings } from "@/store/9-ui-state";
import { confirmQuitMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { R2MCalls } from "@/xternal-to-main";

export const doQuitFromMainAtom = atom(null,
    async (get, set) => {
        const { confirmExit } = appSettings.appUi.uiAdvanced;

        const ok = !confirmExit || await set(doAsyncConfirmDialogAtom, confirmQuitMessages);
        if (!ok) {
            return;
        }
        R2MCalls.setModifiedFilesState(false);
        R2MCalls.closeAppFromRenderer();
    }
);
