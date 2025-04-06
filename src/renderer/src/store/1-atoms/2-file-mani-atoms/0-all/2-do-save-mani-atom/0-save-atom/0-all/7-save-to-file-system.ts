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
            const handle = webFsItem.handle?.kind === 'file' ? webFsItem.handle : null;

            const fileSystemHandle = await fileSave(blob, { fileName }, handle);
            webFsItem.handle = fileSystemHandle;
            return true;
        }
    } catch (error) {
        console.error('saveToFileSystem', error);
    }

    return false;
}
