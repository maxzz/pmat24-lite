import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";

export const doDeleteFileUsAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        // const fileUs = get(fileUsAtom);
        // if (!fileUs) {
        //     return;
        // }

        //TODO: files tree
        //TODO: right panel
        //TODO: dispose fields
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
