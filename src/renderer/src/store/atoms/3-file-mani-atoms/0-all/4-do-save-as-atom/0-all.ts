import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";
import { doSaveOneAtom } from "../2-do-save-main-atom";
import { hasAnyManiChange } from "../../9-types";

export const doSaveOneAsAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {

        //TODO: get new filename
        const newFilename = 'newFilename';

        const fileUs = get(fileUsAtom);

        const changed = hasAnyManiChange({ fileUs });
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom, newFilename);

        console.log('saved as', fileUs.fileCnt.fname);
    }
);

//TODO: submit editor
//TODO: policy editor as part of fields editor
