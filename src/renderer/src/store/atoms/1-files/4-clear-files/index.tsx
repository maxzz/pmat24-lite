import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "../1-do-set-files";

export const doClearFileContentAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, []);
    }
);
