import { atom } from "jotai";
import { confirmQuitMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { R2MCalls } from "@/xternal-to-main";

export const doQuitFromMainAtom = atom(null,
    async (get, set) => {
        const ok = await set(doAsyncConfirmDialogAtom, confirmQuitMessages);
        if (!ok) {
            return;
        }

        R2MCalls.closeWithoutChangesCheck();
    }
);
