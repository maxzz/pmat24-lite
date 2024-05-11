import { Getter, Setter } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";

export function packManifestData(fileUs: FileUs, fileUsAtom: FileUsAtom, get: Getter, set: Setter, newFilename?: string) {
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
}
