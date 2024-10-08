import { FileWithHandleAndPath, getFilesFromDataTransferItems } from "./2-dnd-w-entries";
import { getAllFileSystemEntries, readAllDirectoryEntries } from "./8-nun-old-read-entries";

export type EntryHandle = {
    legacyEntry: FileSystemFileEntry;
    modernHandle: FileSystemFileHandle | null;
};

// function printFileHandles(handles: FileWithHandleAndPath[]) {
//     for (const file of handles) {
//         console.log(`%cpath: "${file.path}"%o`, `color: ${file.handle?.kind === 'directory' ? 'fuchsia' : 'tan'}`, { file, handle: file.handle });
//     }
// }

// function printFileHandles(handles: FileWithHandleAndPath[]) {
//     for (const file of handles) {
//         console.log(`%cpath: "${file.path}"%o`, 'color: tan', { file });
//     }
// }

function printFileSystemEntries(handles: FileSystemEntry[]) {
    for (const file of handles) {
        console.log(`%cpath: "${file.name}"%o`, `color: ${file.isDirectory ? 'fuchsia' : 'tan'}`, { file });
    }
}

export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<FileSystemEntry[]> {
    /*5* /
    const handles = await collectDndItems(dataTransferItemList);

    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${isFsFileHandle(handle) ? 'tan': 'fuchsia'}`, handle);
    }
    /**/

    /*4*/
    const rv: FileSystemEntry[] = await getAllFileSystemEntries(fileDataTransferItems);
    printFileSystemEntries(rv);
    return rv;
    /**/
}
