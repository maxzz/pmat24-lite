import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { clearFileUsChanges, hasFileUsAnyChanges } from "../../../../9-types";
import { fileUsToXmlString } from "./1-fileus-to-xml-string";
import { saveToFileSystem } from "./7-save-to-file-system";
import { debugTestFilename, printXmlManiFile } from "./8-save-utils";
//import { fileDownload } from '@/utils/file-download';

/**
 * newFilename - is dangerous, it can overwrite existing file, create file outside root folder, have new extension, etc.
 * It is better to show our popup dialog and ask user to enter new filename under our root folder with our extension.
 */
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

        const fname = debugTestFilename(newFilename || fileUs.fileCnt.fname);

        const saved = await saveToFileSystem(fileUs, xml, fname);
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
