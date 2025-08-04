import { atom } from "jotai";
import { aboutMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { doGetGeneralInfoAtom } from "@/store/7-napi-atoms";

export const doAboutDialogAtom = atom(null,
    async (get, set) => {
        const rv = await set(doGetGeneralInfoAtom);

        const message = JSON.stringify(JSON.parse(rv), null, 4);

        const ui = {...aboutMessages, message: rv};
        await set(doAsyncConfirmDialogAtom, ui);
    }
);
