import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "../1-do-set-files";
import { undefinedPmatFolder } from "@/store/1-files-atoms/0-files-atom";

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
