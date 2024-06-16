import { atom } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { ManiAtoms } from "../../9-types";

export const doResetOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        console.log('reset', fileUs.fname);

        //TODO: collect all data from all atoms

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
