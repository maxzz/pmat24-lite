import { type FileUs } from "@/store/store-types";
import { fileSave } from "browser-fs-access";
import { getFilenameAndExt } from "@/utils";

export async function saveContentToFile(fileUs: FileUs, content: string, filename: string): Promise<boolean> {
    const saved = false;
    console.log('saved', fileUs);

    const blob = new Blob([content], { type: 'text/xml' });

    const [name, ext] = getFilenameAndExt(filename);
    const newFilename = `${name}.test.${ext}`;

    try {
        //const existingHandle: FileSystemFileHandle | null = fileUs.entry || null;

        const logDropError = (error) => {
            console.error('getAsFileSystemHandleFromEntry', error);
        };

        const fileSystemHandle = await fileSave(blob,
            {
                fileName: newFilename,
            },

        );

        console.log('fileSystemHandle', fileSystemHandle);
    } catch (error) {
        console.error('saveContentToFile', error);
        return false;
    }


    return saved;
}

//TODO: add member fileUs.contentToSave
