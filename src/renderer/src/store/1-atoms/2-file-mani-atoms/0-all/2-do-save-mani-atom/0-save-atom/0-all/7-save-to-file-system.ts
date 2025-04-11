import { fileSave } from "browser-fs-access";
import { type FileUs } from "@/store/store-types";
import { rootDir } from "@/store";
import { invokeMain } from "@/xternal-to-main";

export async function saveToFileSystem(fileUs: FileUs, content: string, fileName: string): Promise<boolean> {
    try {
        if (fileUs.fileCnt.fromMain) {

            //throw new Error('Save from main not implemented yet');
            const fullPath = `${fileUs.fileCnt.fpath}/${fileUs.fileCnt.fname}`;
            const errorText = await invokeMain({ type: 'r2mi:save-file', fileName: fullPath, content });
            
            console.log(`saveToFileSystem: errorText: "${errorText}"`);
            return !errorText;

        } else {
            const webFsItem = fileUs.fileCnt.webFsItem;
            if (!webFsItem) {
                throw new Error('Cannot save wo/ webFsItem');
            }

            const blob = new Blob([content], { type: 'text/xml' });

            const needRename = fileName !== fileUs.fileCnt.fname;
            let handle = webFsItem.handle?.kind === 'file' ? webFsItem.handle : null;
            let deletePrevName = needRename && handle;

            if (needRename || fileUs.fileCnt.newFile) {
                handle = rootDir.handle ? await rootDir.handle.getFileHandle(fileName, { create: true }) : null;
            }

            const fileSystemHandle = await fileSave(blob, { fileName }, handle);
            webFsItem.handle = fileSystemHandle;

            // if (deletePrevName) {
            //     await rootDir.handle?.removeEntry(fileUs.fileCnt.fname);
            // }

            return true;
        }
    } catch (error) {
        console.error('saveToFileSystem', error);
    }

    return false;
}
