import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";
import { doSaveOneAtom } from "../2-do-save-main-atom";

export const doSaveOneAsAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {

        //TODO: get new filename
        const newFilename = 'newFilename';

        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom, newFilename);

        console.log('saved as', fileUs.fname);
    }
);

//TODO: submit editor
//TODO: policy editor as part of fields editor
