import { atom } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { ManiAtoms } from "../9-types";

export const doSaveOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        const maniAtoms = get(fileUs.atomsAtom);
        if (!maniAtoms) {
            return;
        }

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

//TODO: file save/reset from atoms
//TODO: submit editor
//TODO: policy editor as part of fields editor
