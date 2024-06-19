import { Getter, Setter } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { FieldConv } from "../../1-fields/0-conv";
import { ManiConv } from "./1-conv-mani";

export function packManifestData(get: Getter, set: Setter, fileUs: FileUs, fileUsAtom: FileUsAtom, newFilename?: string) {

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return;
    }

    const loginFormAtoms = maniAtoms[0];
    const cpassFormAtoms = maniAtoms[1];

    if (loginFormAtoms) {

        loginFormAtoms.fieldsAtoms.map((fieldAtoms) => {
            const fromAtomValues = FieldConv.fromAtoms(fieldAtoms, get, set);
            const maniValues = FieldConv.forMani(fromAtomValues);
            const fileValues = ManiConv.fieldForFileMani(maniValues, fieldAtoms.metaField);

            console.log('maniValues', JSON.stringify(fileValues, null, 2));
        });

        // loginFormAtoms.submitAtoms;
        // loginFormAtoms.policyAtoms;
        // loginFormAtoms.optionsAtoms;
    }

    console.log('saved', fileUs.fname);

    // fileUs.changesSet.clear();

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
