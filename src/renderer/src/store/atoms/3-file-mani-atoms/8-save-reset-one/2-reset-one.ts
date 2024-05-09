import { atom } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { ManiAtoms } from "../9-types";

export const doResetOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.atomsAtom);
        if (!maniAtoms) {
            return;
        }

        console.log('reset', fileUs.fname);

        /*
        (get, set, maniAtoms: ManiAtoms) => {

        const loginFormAtoms = maniAtoms[0];
        const cpassFormAtoms = maniAtoms[1];

        if (loginFormAtoms) {
            loginFormAtoms.params.fileUsAtom

            loginFormAtoms.fieldsAtoms
            loginFormAtoms.submitAtoms
            loginFormAtoms.policyAtoms
            loginFormAtoms.optionsAtoms
        }
        */
    }
);
