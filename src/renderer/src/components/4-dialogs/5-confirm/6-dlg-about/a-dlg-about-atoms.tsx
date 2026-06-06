import { atom } from "jotai";
import { aboutMessages, doAsyncExecuteConfirmDialogAtom } from "../1-confirmation";
import { asyncGetAboutInfo } from "@/store/7-napi-atoms";
import { DialogBodyFromJson } from "./1-dlg-about-body";

export const doAboutDialogAtom = atom(
    null,
    async (get, set) => {
        const jsonStr = await asyncGetAboutInfo(); // console.log('about.info:', json);
        const ui = {
            ...aboutMessages,
            message: DialogBodyFromJson({ jsonStr })
        };
        await set(doAsyncExecuteConfirmDialogAtom, ui);
    }
);
