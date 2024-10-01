import { atom, Getter, Setter } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { convertToXml, type Mani } from "@/store/manifest";
import { stopIfAnyErrors } from "../1-stop-if-errors";
import { packManifest } from "./1-pack-manifest";
import { printTestManifest } from "./8-print-test-manifest";
import { toManiFileFormat } from "./3-to-mani-file-format";
import { saveContentToFile } from "./4-save-content";
import { ManiAtoms } from "../../../9-types";

function createXml(fileUsAtom: FileUsAtom, get: Getter, set: Setter): string | undefined {
    const fileUs = get(fileUsAtom);

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (!maniAtoms || stopIfAnyErrors(maniAtoms, get, set)) {
        return;
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = {
        forms: [],
    };

    packManifest({ fileUs, fileUsAtom, maniAtoms, newMani, get, set });

    const fileMani = toManiFileFormat(newMani);

    const {xml, error} = convertToXml(fileMani)

    console.log('xml', xml);

    if (error || !xml) {
        console.error('Error converting to xml', error);
        return;
    }

    return xml;
}

export const doSaveOneAtom = atom(
    null,
    async (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
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

        const fileMani = toManiFileFormat(newMani);

        const {xml, error} = convertToXml(fileMani)

        console.log('xml', xml);

        if (error || !xml) {
            console.error('Error converting to xml', error);
            return;
        }
        
        // printTestManifest(fileMani);
        // printTestManifest(newMani);

        //TODO: newFilename
        //TODO: each file may have no filename or name may already be taken by another file

        const saved = await saveContentToFile(fileUs, xml, newFilename || fileUs.fname);
        if (!saved) {
            //TODO: update member fileUs.contentToSave
            return;
        }

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
//TODO: submit editor - done
//TODO: policy editor as part of fields editor - done

//TODO: The rest: the links between forms, etc.

//TODO: Update number input to show shorter lines
