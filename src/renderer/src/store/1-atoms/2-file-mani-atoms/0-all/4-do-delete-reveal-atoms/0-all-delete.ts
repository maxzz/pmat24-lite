import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { addToTotalManis, filesAtom, rightPanelAtom } from "@/store";
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

        if (fileUs.fileCnt.newFile) {
            
            addToTotalManis(fileUs);
        }

        // dispose fields
        set(doDisposeFileUsAtomAtom, fileUsAtom);
        
        //right panel
        set(rightPanelAtom, undefined);

        //TODO: delete file from file system
        //TODO: check if field catalog

        // set(fileUs.maniAtomsAtom, null);
        // set(fileUs.fceAtomsForFcFile, null);
        // set(fileUs.rawCpassAtom, null);

        // const fileUss = get(filesAtom);
        // fileUss.splice(fileUss.indexOf(fileUsAtom), 1);
        // set(filesAtom, fileUss);
    }
);

export const deleteCpassFromFileUsAtom = atom(null,
    (get, set, cpassUsAtom: FileUsAtom) => {
    }
);
