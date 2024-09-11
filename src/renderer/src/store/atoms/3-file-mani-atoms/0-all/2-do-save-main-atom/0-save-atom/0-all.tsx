import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { type Mani } from "@/store/manifest";
import { stopIfAnyErrors } from "../1-stop-if-errors";
import { packManifest } from "./1-pack-manifest";

export const doSaveOneAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        //

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        if (stopIfAnyErrors(maniAtoms, get, set)) {
            return;
        }

        //

        const rvManifest: Partial<Mani.Manifest> = {};

        packManifest({ fileUs, fileUsAtom, maniAtoms, rvManifest, get, set });

        //TODO: The rest: the links between forms, etc.
        //TODO: newFilename

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
);

//TODO: submit editor
//TODO: policy editor as part of fields editor - done
//TODO: add validation
