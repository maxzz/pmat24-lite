import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "../1-do-set-files";
import { undefinedPmatFolder } from "@/store/1-atoms/1-files/0-files-atom";

export const doCloseRootDirAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, {
            deliveredFileContents: undefined,
            root: undefinedPmatFolder(),
            noItemsJustDir: false,
        });
    }
);
