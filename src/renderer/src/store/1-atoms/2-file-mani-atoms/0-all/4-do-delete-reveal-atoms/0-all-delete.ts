import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { filesAtom, removeFromTotalManis, rightPanelAtom } from "@/store";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";

export const doDeleteFileUsAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);
        if (!fileUs || fileUs.parsedSrc.stats.isFCat) {
            return;
        }

        // files tree
        const files = get(filesAtom);
        if (files.indexOf(fileUsAtom) === -1) {
            console.error('not in filesAtom', fileUs);
            return;
        }

        const newFiles = files.filter((fileUsAtom) => fileUsAtom !== fileUsAtom);
        set(filesAtom, newFiles);

        if (!fileUs.fileCnt.newFile) {
            //TODO: delete file from file system    
        }

        removeFromTotalManis(fileUs);

        // dispose fields
        set(doDisposeFileUsAtomAtom, fileUsAtom);

        //right panel
        set(rightPanelAtom, undefined);
    }
);

export const deleteCpassFromFileUsAtom = atom(null,
    (get, set, cpassUsAtom: FileUsAtom) => {
    }
);
