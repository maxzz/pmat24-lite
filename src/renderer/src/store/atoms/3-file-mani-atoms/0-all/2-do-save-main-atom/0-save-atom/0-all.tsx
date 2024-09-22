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

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms || stopIfAnyErrors(maniAtoms, get, set)) {
            return;
        }

        // Now validation done

        const rvManifest: Partial<Mani.Manifest> = {
            forms: [],
        };

        packManifest({ fileUs, fileUsAtom, maniAtoms, newMani: rvManifest, get, set });

        //TODO: The rest: the links between forms, etc.
        //TODO: newFilename

        console.log('saved', fileUs.fname);

        // fileUs.changesSet.clear();
    }
);

//TODO: validate - done
//TODO: check if we can save from web or electron
//TODO: collect all data from all atoms - done
//TODO: each file may have no filename

//TODO: add validation - done
//TODO: submit editor - done
//TODO: policy editor as part of fields editor - done



//TODO: update values from file after successful save
//TODO: update values from file after successful save
//TODO: update values from file after successful save
//TODO: update values from file after successful save
//TODO: update values from file after successful save
