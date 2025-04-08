import { type Getter, atom } from "jotai";
import { toast } from "sonner";
import { type FileContent } from "@shared/ipc-types";
import { type FileUsAtom } from "@/store/store-types";
import { clearFileUsChanges, hasFileUsAnyChanges } from "../../../../9-types";
import { fileUsToXmlString } from "./1-fileus-to-xml-string";
import { saveToFileSystem } from "./7-save-to-file-system";
import { debugTestFilename, printXmlManiFile } from "./8-save-utils";
import { filesAtom } from "@/store/1-atoms/1-files";
import { updateTotalManis } from "@/store/1-atoms/9-ui-state";
import { doTriggerRightPanelSelectedAtom } from "@/store/1-atoms/3-right-panel";
import { doSelectFileUsTreeAtom } from "@/components/2-main/1-left/2-files-list";

/**
 * newFilename - filename without path.
 * It is dangerous, it can overwrite existing file, create file outside root folder, have new extension, etc.
 * It is better to show our popup dialog and ask user to enter new filename under our root folder with our extension.
 */
export const doSaveOneAtom = atom(
    null,
    async (get, set, fileUsAtom: FileUsAtom, newFilename?: string): Promise<boolean> => {
        const fileUs = get(fileUsAtom);

        const changed = hasFileUsAnyChanges({ fileUs }) || fileUs.fileCnt.newFile;
        if (!changed) {
            return false;
        }

        const xml = fileUsToXmlString(fileUsAtom, get, set);
        if (!xml) {
            return false;
        }

        //printXmlManiFile(xml);
        // return;

        // 2. Save to file system

        const fname = debugTestFilename(newFilename || fileUs.fileCnt.fname);

        const saved = await saveToFileSystem(fileUs, xml, fname);
        if (!saved) {
            toast.error(`Cannot save file ${fname}`);
            return false;
        }

        // 3. Update internal file state after successful save

        if (newFilename) {
            fileUs.fileCnt.fname = newFilename; //TODO: update tree names maybe required
        }

        fileUs.fileCnt.newFile = false;
        clearFileUsChanges({ fileUs });

        fileUs.fileCnt.raw = xml; // Update file content with new xml //TODO: somehow it's already there

        updateTotalManis(fileUs);

        //printFilesAtom('⏱ save before', [...get(filesAtom)], get, fileUs.fileCnt);

        const currentFiles = [...get(filesAtom), fileUsAtom];
        //currentFiles.push(fileUsAtom);
        set(filesAtom, currentFiles); //TODO: we need to select the new file in the files tree if it's in the current filter (what if not? maybe reset filter? or show it regardless of the filter?)


        //printFilesAtom('⏱ save after', [...get(filesAtom)], get);

        //set(doTriggerRightPanelSelectedAtom, { newAtom: fileUsAtom }); // It's OK file is shown in the right panel but not selected in the tree
        set(doSelectFileUsTreeAtom, fileUsAtom);

        toast.info(`File "${fname}" saved`);
        console.log('saved', fileUs.fileCnt.fname);
        return true;

        /** /
        //TODO: update files tree. File can be save to the root folder, subfolder or any higher level folder.

        //TODO: check if we can save from web or electron

        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        //TODO: update values from file after successful save
        /**/

        return true;
    }
);

function printFilesAtom(title: string, files: FileUsAtom[], get: Getter, fileCnt?: FileContent) {
    console.log(title, files.length, fileCnt ? { fileCnt } : '');
    files.forEach(
        (fileUsAtom) => {
            const fileUs = get(fileUsAtom);
            if (!fileUs?.fileCnt) {
                console.error('\t\t: null', fileUs, fileUsAtom.toString());
                return;
            }
            console.log('\t\t', fileUs.fileCnt.unid, fileUsAtom.toString(), fileUs.fileCnt.fname, { fileUs });
        }
    );
}

//TODO: validate - done
//TODO: collect all data from all atoms - done
//TODO: submit editor - done
//TODO: policy editor as part of fields editor - done

//TODO: The rest: the links between forms, etc.

//TODO: Update number input to show shorter lines

//TODO:
// add member fileUs.contentToSave
//      const saved = await saveToFileSystem(fileUs, xml, fname);
//      if (!saved) {
//          //TODO: update member fileUs.contentToSave
//          return;
//      }
// or maybe not needed
