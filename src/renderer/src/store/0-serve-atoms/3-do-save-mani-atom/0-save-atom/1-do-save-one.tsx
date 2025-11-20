import { atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { fileUsChanges } from "@/store/2-file-mani-atoms/9-types";
import { filesAtom } from "@/store/5-1-open-files";
import { saveToFileSystem } from "@/store/0-serve-atoms/7-file-system-manipulation";
import { inTest_Set } from "@/store/0-serve-atoms/6-do-inuse-test";
import { fileUsToXmlString } from "./7-fileus-to-xml-string";
import { updateManiAtomsAfterSaveOrResetAtom } from "./3-save-or-rst-maniatoms";
import { makeDebugTestFilename, notice_SaveError } from "./8-save-utils";
//import { printXmlManiFile } from "./8-save-utils";

/**
 * newFilename - filename without path.
 * It is dangerous, it can overwrite existing file, create file outside root folder, have new extension, etc.
 * It is better to show our popup dialog and ask user to enter new filename under our root folder with our extension.
 */
export const doSaveOneAtom = atom(
    null,
    async (get, set, { fileUsAtom, newFilename }: { fileUsAtom: FileUsAtom, newFilename?: string; }): Promise<boolean> => {
        const fileUs = get(fileUsAtom);

        const changed = fileUsChanges.hasAny({ fileUs }) || fileUs.fileCnt.newFile;
        if (!changed) {
            return false;
        }

        // 1. Create xml to be saved

        const xml = await fileUsToXmlString(fileUsAtom, true, { get, set }); //printXmlManiFile(xml);
        if (!xml) {
            return false;
        }

        // 2. Save to file system

        const fname = makeDebugTestFilename(newFilename || fileUs.fileCnt.fname);

        const errorText = await saveToFileSystem(fileUs, xml, fname);
        if (errorText) {
            notice_SaveError(fname, errorText);
            return false;
        }

        // 3. Update internal file state after successful save

        fileUs.fileCnt.idx = get(filesAtom).length;
        fileUs.fileCnt.fname = fname;
        fileUs.fileCnt.rawLoaded = xml; // Update file content with new modified xml
        fileUs.fileCnt.newFile = false;
        set(fileUs.rawCpassAtom, undefined);
        fileUsChanges.setUnchanged({ fileUs });

        set(fileUs.hwndLoginAtom, null); // Turn off fields highlight on both login and cpass
        set(fileUs.hwndCpassAtom, null);

        //parse xml and so on...
        set(updateManiAtomsAfterSaveOrResetAtom, { fileUsAtom, resetToPrev: false });

        await inTest_Set({ fileUs, inTest: get(fileUs.maniInTestAtom), deleteFile: false }); // Manifest in cache should be updated
        return true;
    }
);

function printFilesAtom(title: string, files: FileUsAtom[], { get }: GetSet, fileCnt?: FileContent) {
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

//04.11.25
//TODO: update values from file after successful save
//TODO: delete file atom to delete login
//TODO: delete password change
//TODO: remove from new login options and leave only login name
