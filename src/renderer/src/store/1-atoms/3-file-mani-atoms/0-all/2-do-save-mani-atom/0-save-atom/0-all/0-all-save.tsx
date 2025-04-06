import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { clearFileUsChanges, hasFileUsAnyChanges } from "../../../../9-types";
import { fileUsToXmlString } from "./1-fileus-to-xml-string";
import { saveContentToFile } from "./7-save-to-file-system";
import { printXmlManiFile } from "./8-save-utils";
//import { fileDownload } from '@/utils/file-download';

export const doSaveOneAtom = atom(
    null,
    async (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = hasFileUsAnyChanges({ fileUs });
        if (!changed) {
            return;
        }

        const xml = fileUsToXmlString(fileUsAtom, get, set);
        if (!xml) {
            return;
        }

        printXmlManiFile(xml);
        // return;

        /**/
        //TODO: newFilename
        //TODO: each file may have no filename or name may already be taken by another file

        const saved = await saveContentToFile(fileUs, xml, newFilename || fileUs.fileCnt.fname);
        if (!saved) {
            //TODO: update member fileUs.contentToSave
            return;
        }

        // 2.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });

        console.log('saved', fileUs.fileCnt.fname);

        // Do this only after successful save:
        clearFileUsChanges({ fileUs });

        // Update file content with new xml
        fileUs.fileCnt.raw = xml;

        //TODO: update files tree. File can be save to the root folder, subfolder or any higher level folder.

        //TODO: check if we can save from web or electron

        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        /**/
    }
);

//TODO: validate - done
//TODO: collect all data from all atoms - done
//TODO: submit editor - done
//TODO: policy editor as part of fields editor - done

//TODO: The rest: the links between forms, etc.

//TODO: Update number input to show shorter lines
