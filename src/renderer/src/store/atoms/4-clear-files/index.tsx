import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "../1-files";
import { rightPanelAtom } from "../3-right-panel";

export const doClearFileContentAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, []);
        set(rightPanelAtom, null);
    }
);
