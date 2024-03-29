import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "..";
import { rightPanelAtom } from "../../2-right-panel";

export const doClearFileContentAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, []);
        set(rightPanelAtom, null);
    }
);
