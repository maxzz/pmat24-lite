import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "@/store/0-serve-atoms/1-do-set-files";
import { inTest_DeleteDir } from "@/store/0-serve-atoms/6-do-inuse-test";
import { undefinedPmatFolder } from "@/store/5-1-files";

export const doCloseRootDirAtom = atom(
    null,
    async (get, set) => {
        set(doSetDeliveredFilesAtom, {
            deliveredFileContents: undefined,
            root: undefinedPmatFolder(),
            noItemsJustDir: false,
        });

        await inTest_DeleteDir();
    }
);
