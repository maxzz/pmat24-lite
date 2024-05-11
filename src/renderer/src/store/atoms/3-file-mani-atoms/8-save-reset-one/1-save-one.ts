import { atom } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { ManiAtoms } from "../9-types";
import { rightPanelAtom } from "../../2-right-panel";

export const doSaveOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.atomsAtom);
        if (!maniAtoms) {
            return;
        }

        console.log('saved', fileUs.fname);



        //TODO: validate
        //TODO: check if we can save from web or electron
        //TODO: collect all data from all atoms
        //TODO: each file may have no filename



        // const loginFormAtoms = maniAtoms[0];
        // const cpassFormAtoms = maniAtoms[1];

        // if (loginFormAtoms) {
        //     loginFormAtoms.fieldsAtoms;
        //     loginFormAtoms.submitAtoms;
        //     loginFormAtoms.policyAtoms;
        //     loginFormAtoms.optionsAtoms;
        // }

        // Done

        fileUs.changesSet.clear();
    }
);

export const doSaveOneIfNotNullAtom = atom(null,
    (get, set) => {
        const fileUsAtom = get(rightPanelAtom);

        if (!fileUsAtom) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom);
    }
);

//TODO: submit editor
//TODO: policy editor as part of fields editor
