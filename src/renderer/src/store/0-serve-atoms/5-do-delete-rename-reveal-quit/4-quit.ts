import { atom } from "jotai";
import { appSettings } from "@/store/9-ui-state";
import { confirmQuitMessages } from "@/components/4-dialogs/5-confirm/a-confirm-atoms/8-confirmation-ui-messages";
import { doAsyncExecuteConfirmDialogAtom } from "@/components/4-dialogs/5-confirm/a-confirm-atoms/9-types-confirm";
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
