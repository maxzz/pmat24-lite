import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { filesAtom } from "@/store";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";

export const doDeleteFileUsAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);
        if (!fileUs) {
            return;
        }

        const files = get(filesAtom);
        const newFiles = files.filter((fileUsAtom) => fileUsAtom !== fileUsAtom);
        set(filesAtom, newFiles);

        // const idx = files.indexOf(fileUsAtom);
        // if (idx === -1) {
        //     console.error('not in filesAtom', fileUs);
        //     return;
        // }
        // files.splice(files.indexOf(fileUsAtom), 1);
        // set(filesAtom, files);

        set(doDisposeFileUsAtomAtom, fileUsAtom);

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
