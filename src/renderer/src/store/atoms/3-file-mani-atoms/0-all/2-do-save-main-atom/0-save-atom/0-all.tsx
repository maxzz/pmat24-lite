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

        const newMani: Partial<Mani.Manifest> = {
            forms: [],
        };

        packManifest({ fileUs, fileUsAtom, maniAtoms, newMani, get, set });

        //TODO: The rest: the links between forms, etc.
        
        //TODO: newFilename
        //TODO: each file may have no filename

        console.log('saving', JSON.stringify(newMani, null, 2));
        
        console.log('saved', fileUs.fname);

        // Do this only after successful save:
        // fileUs.changesSet.clear();

        //TODO: check if we can save from web or electron

        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
    }
);

//TODO: validate - done
//TODO: collect all data from all atoms - done

//TODO: add validation - done
//TODO: submit editor - done
//TODO: policy editor as part of fields editor - done
