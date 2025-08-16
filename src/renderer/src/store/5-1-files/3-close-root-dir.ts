import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "@/store/0-serve-atoms/1-do-set-files";
import { undefinedPmatFolder } from "@/store/5-1-files";

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
