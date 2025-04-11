import { type Getter, atom } from "jotai";
import { toast } from "sonner";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { clearFileUsChanges, hasFileUsAnyChanges } from "../../../../9-types";
import { fileUsToXmlString } from "./1-fileus-to-xml-string";
import { saveToFileSystem } from "./7-save-to-file-system";
import { debugTestFilename, printXmlManiFile } from "./8-save-utils";
import { filesAtom, rootDir } from "@/store/1-atoms/1-files";
import { addToTotalManis } from "@/store/1-atoms/9-ui-state";
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

        // 1. Create xml to be saved

        const xml = fileUsToXmlString(fileUsAtom, get, set);
        if (!xml) {
            return false;
        }
        //printXmlManiFile(xml);

        // 2. Save to file system

        const fname = debugTestFilename(newFilename || fileUs.fileCnt.fname);

        const errorText = await saveToFileSystem(fileUs, xml, fname);
        if (errorText) {
            toast.error(`Cannot save file ${fname}.\n${errorText}`, { duration: 5000 });
            return false;
        }

        // 3. Update internal file state after successful save

        fileUs.fileCnt.idx = get(filesAtom).length;
        fileUs.fileCnt.fname = fname;
        fileUs.fileCnt.raw = xml; // Update file content with new modified xml
        clearFileUsChanges({ fileUs });

        if (fileUs.fileCnt.newFile) {
            set(filesAtom, [...get(filesAtom), fileUsAtom]);
            addToTotalManis(fileUs);

            setTimeout(() => set(doSelectFileUsTreeAtom, fileUsAtom), 500); // It's OK if deley will be 0, but delay is good for UX (to show dynamic of changes)
            finalNotification(fileUs);

            fileUs.fileCnt.newFile = false;
        }

        return true;
    }
);

function finalNotification(fileUs: FileUs) {
    if (appSettings.appUi.uiGeneral.notifyNewFile) {
        toast.info(`File "${fileUs.fileCnt.fname}" saved`);
    }
    console.log('saved', fileUs.fileCnt.fname);
}

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
//TODO: update files tree. File can be save to the root folder, subfolder or any higher level folder - done. Don't allow to save to the different folder.
//TODO: we need to select the new file in the files tree if it's in the current filter (what if not? maybe reset filter? or show it regardless of the filter?) - done
//TODO: check if we can save from web or electron - done

//TODO: The rest: the links between forms, etc.

//TODO: Update number input to show shorter lines

//done:
//printFilesAtom('⏱ save before', [...get(filesAtom)], get, fileUs.fileCnt);
//printFilesAtom('⏱ save after', [...get(filesAtom)], get);

//TODO:
// add member fileUs.contentToSave
//      const saved = await saveToFileSystem(fileUs, xml, fname);
//      if (!saved) {
//          //TODO: update member fileUs.contentToSave
//          return;
//      }
// or maybe not needed

//TODO: update values from file after successful save
