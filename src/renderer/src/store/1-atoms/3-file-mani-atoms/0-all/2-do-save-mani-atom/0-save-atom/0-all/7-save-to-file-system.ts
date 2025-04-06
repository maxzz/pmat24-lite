import { type FileUs } from "@/store/store-types";
import { fileSave } from "browser-fs-access";
import { getFilenameAndExt } from "@/utils";

export async function saveToFileSystem(fileUs: FileUs, content: string, fileName: string): Promise<boolean> {
    const blob = new Blob([content], { type: 'text/xml' });

    const [name, ext] = getFilenameAndExt(fileName); fileName = `${name}.test.${ext}`; // Debug only name

    try {
        if (fileUs.fileCnt.fromMain) {
            throw new Error('Save from main not implemented yet');
        } else {
            const webFsItem = fileUs.fileCnt.webFsItem;
            if (!webFsItem) {
                throw new Error('Cannot save wo/ webFsItem');
            }

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

//TODO: add member fileUs.contentToSave
