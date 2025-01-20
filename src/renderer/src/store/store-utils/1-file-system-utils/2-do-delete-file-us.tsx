import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { rightPanelAtom } from "@/store/1-atoms";
import { doDiscardFileUsAtom } from "./8-discard-file-us";

/**
 * Delete single file
 */
export const doDeleteFileUsAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom) => {
        if (get(rightPanelAtom) === fileUsAtom) {
            set(rightPanelAtom, undefined);
        }

        const fileUs = get(fileUsAtom);
        set(doDiscardFileUsAtom, fileUs);

        //TODO: remove file from filesAtom and File system
    }
);
