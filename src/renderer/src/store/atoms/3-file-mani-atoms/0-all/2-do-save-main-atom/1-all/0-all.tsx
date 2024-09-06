import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { packManifestData } from "../0-conv/1-pack-manifest-data";
import { stopIfNormalErrors } from "./1-stop-if-errors-normal";
import { stopIfManualErrors } from "./2-stop-if-errors-manual";
import { stopIfOptionErrors } from "./3-stop-if-errors-options";

export const doSaveOneAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        //

        const [login, cpass] = maniAtoms;

        if (login?.normal) {
            if (stopIfNormalErrors(maniAtoms, get, set)) {
                return;
            }
        }

        if (cpass?.normal) {
            if (stopIfNormalErrors(maniAtoms, get, set)) {
                return;
            }
        }

        //

        if (login?.manual) {
            if (stopIfManualErrors(maniAtoms, get, set)) {
                return;
            }
        }

        if (cpass?.manual) {
            if (stopIfManualErrors(maniAtoms, get, set)) {
                return;
            }
        }

        //

        packManifestData(get, set, fileUs, fileUsAtom, newFilename);

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
