import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "../1-do-set-files";
import { undefinedPmatFolder } from "@/store";

export const doCloseRootDirAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, { deliveredFileContents: undefined, root: undefinedPmatFolder() });
    }
);
