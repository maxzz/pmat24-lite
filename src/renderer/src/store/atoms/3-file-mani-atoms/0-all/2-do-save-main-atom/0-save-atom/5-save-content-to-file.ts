import { type FileUs } from "@/store/store-types";
import { fileSave } from "browser-fs-access";
import { getFilenameAndExt } from "@/utils";

export async function saveContentToFile(fileUs: FileUs, content: string, filename: string): Promise<boolean> {
    const rvSaved = false;

    const blob = new Blob([content], { type: 'text/xml' });

    const [name, ext] = getFilenameAndExt(filename);
    const newFilename = `${name}.test.${ext}`;

    try {
        //const existingHandle: FileSystemFileHandle | null = fileUs.entry || null;

        const logDropError = (error) => {
            console.error('getAsFileSystemHandleFromEntry', error);
        };

        const handle = fileUs.fileCnt.webFsItem?.handle?.kind === 'file' ? fileUs.fileCnt.webFsItem.handle : null;

        const fileSystemHandle = await fileSave(blob, { fileName: newFilename, }, handle);

        if (fileUs.fileCnt.webFsItem) {
            fileUs.fileCnt.webFsItem.handle = fileSystemHandle;
        }

        console.log('saveContentToFile, fileSystemHandle', fileSystemHandle);
    } catch (error) {
        console.error('saveContentToFile', error);
        return false;
    }

    return rvSaved;
}

//TODO: add member fileUs.contentToSave
