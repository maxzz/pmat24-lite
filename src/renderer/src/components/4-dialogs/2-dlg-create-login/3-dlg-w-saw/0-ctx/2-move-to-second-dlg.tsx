import { atom } from "jotai";
import { getXmlCreateFileUs } from "../../0-ctx-new-mani";
import { doOpenCreateManiSawAtom, doOpenSawOverlayAtom } from "@/store";
import { doTurnOffSawModeOnClientAtom } from "./1-saw-mode-on-client";

export const showProgressAtom = atom(false);

export const moveToSecondDlgAtom = atom(
    null,
    async (get, set, { cancel, hwnd }: { cancel: boolean; hwnd: string; }): Promise<boolean> => {
        if (cancel) {
            set(doOpenSawOverlayAtom, false);
            set(doTurnOffSawModeOnClientAtom);
            return false;
        }

        // before close and open next dialog:
        //TODO: no controls
        //TODO: manual mode

        set(doOpenSawOverlayAtom, false);
        set(doTurnOffSawModeOnClientAtom);

        const move = await getXmlCreateFileUs({ hwnd, showProgressAtom, get, set });
        if (!move) {
            return false;
        }

        set(doOpenCreateManiSawAtom, true);
        return true;
    }
);
