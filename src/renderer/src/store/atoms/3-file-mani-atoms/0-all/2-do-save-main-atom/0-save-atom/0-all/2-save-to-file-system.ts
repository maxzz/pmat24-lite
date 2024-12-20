import { type FileUs } from "@/store/store-types";
import { fileSave } from "browser-fs-access";
import { getFilenameAndExt } from "@/utils";

export async function saveContentToFile(fileUs: FileUs, content: string, filename: string): Promise<boolean> {
    const blob = new Blob([content], { type: 'text/xml' });

    const [name, ext] = getFilenameAndExt(filename);
    const newFilename = `${name}.test.${ext}`;

    try {
        if (fileUs.fileCnt.fromMain) {
            throw new Error('Cannot save from main. Not implemented yet.');
        }

        const handle = fileUs.fileCnt.webFsItem?.handle?.kind === 'file' ? fileUs.fileCnt.webFsItem.handle : null;

        const fileSystemHandle = await fileSave(blob, { fileName: newFilename, }, handle);

        if (fileUs.fileCnt.webFsItem) {
            fileUs.fileCnt.webFsItem.handle = fileSystemHandle;
        }

        console.log('saveContentToFile, fileSystemHandle', fileSystemHandle);
        
        return true;
    } catch (error) {
        console.error('saveContentToFile', error);
        return false;
    }
}

//TODO: add member fileUs.contentToSave
