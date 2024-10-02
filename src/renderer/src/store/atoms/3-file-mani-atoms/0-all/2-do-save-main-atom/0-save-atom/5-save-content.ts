import { getAsFileSystemHandleFromEntry } from "@/store/atoms/1-files/2-do-web-deliver/getDroppedFiles";
import { type FileUs } from "@/store/store-types";
import { fileSave } from "browser-fs-access";

// function replaceExt(filename: string, newExt: string): string {
//     return filename.replace(/\.[^/.]+$/, newExt); // replace last extension; ("name.ext", ".com") -> 'name.com'; ("name", ".com") -> 'name'
// }

// function fileExt(filename: string): string {
//     return filename.split('.').pop() || '';
// }

// function removeExt(filename: string): string {
//     return filename.replace(/\.[^/.]+$/, ''); // replace last extension; ("name.ext") -> 'name'; ("name") -> 'name'
// }

function getFilenameAndExt(filename: string): [string, string] {
    const parts = filename.split('.'); // not good if dot is the folder name and last part is the file name wo/ dot.
    const ext = parts.pop() || '';
    const name = parts.join('.');
    return [name, ext];
}

export async function saveContentToFile(fileUs: FileUs, content: string, filename: string): Promise<boolean> {
    //TODO: add member fileUs.contentToSave
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
        const handle = getAsFileSystemHandleFromEntry(fileUs.entry, logDropError ) as FileSystemFileHandle | null | undefined;

        const fileSystemHandle = await fileSave(blob,
            {
                fileName: newFilename,
            },
            handle,

        );

        console.log('fileSystemHandle', fileSystemHandle);
    } catch (error) {
        console.error('saveContentToFile', error);
        return false;
    }


    return saved;
}
