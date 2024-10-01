import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { saveContentToFile } from "./5-save-content";
import { createXmlText } from "./4-create-xml-text";

export const doSaveOneAtom = atom(
    null,
    async (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const xml = createXmlText(fileUsAtom, get, set);
        if (!xml) {
            return;
        }

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
