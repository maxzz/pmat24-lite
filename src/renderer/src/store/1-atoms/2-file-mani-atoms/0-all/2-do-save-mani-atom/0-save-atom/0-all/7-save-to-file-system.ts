import { rootDir } from "@/store";
import { type FileUs } from "@/store/store-types";
import { fileSave } from "browser-fs-access";

export async function saveToFileSystem(fileUs: FileUs, content: string, fileName: string): Promise<boolean> {
    try {
        if (fileUs.fileCnt.fromMain) {
            throw new Error('Save from main not implemented yet');
        } else {
            const webFsItem = fileUs.fileCnt.webFsItem;
            if (!webFsItem) {
                throw new Error('Cannot save wo/ webFsItem');
            }

            const blob = new Blob([content], { type: 'text/xml' });
            
            const needRename = fileName !== fileUs.fileCnt.fname;
            let handle = webFsItem.handle?.kind === 'file' ? webFsItem.handle : null;
            let deletePrevName = needRename && handle;

            if (needRename) {
                handle = rootDir.handle ? await rootDir.handle.getFileHandle(fileName, { create: true }) : null;
            }

            const fileSystemHandle = await fileSave(blob, { fileName }, handle);
            webFsItem.handle = fileSystemHandle;

            if (deletePrevName) {
                await rootDir.handle?.removeEntry(fileUs.fileCnt.fname);
            }

            return true;
        }
    } catch (error) {
        console.error('saveToFileSystem', error);
    }

    return false;
}
