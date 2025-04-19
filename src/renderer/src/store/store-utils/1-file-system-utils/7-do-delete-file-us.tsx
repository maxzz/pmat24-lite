import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { rightPanelAtom } from "@/store/1-atoms";
import { doDisposeFileUsAtom } from "./8-dispose-file-us";

/**
 * Delete single file
 */
const doDeleteFileUsAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom) => {
        if (get(rightPanelAtom) === fileUsAtom) {
            set(rightPanelAtom, undefined);
        }

        const fileUs = get(fileUsAtom);
        set(doDisposeFileUsAtom, fileUs);

        //TODO: remove file from filesAtom and File system
    }
);

//TODO: I think this is wrapper to doDiscardFileUsAtom and is not ready yet and should not be here: it has access to files and discards single file.
