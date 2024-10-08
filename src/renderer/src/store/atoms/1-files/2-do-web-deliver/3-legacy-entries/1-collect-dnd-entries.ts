import { FileWithHandleAndPath, getFilesFromDataTransferItems } from "./2-dnd-w-entries";
//import { getFilesFromDataTransferItems2 } from "./2-dnd-w-entries-2";
//import { getAllFileSystemEntries, readAllDirectoryEntries } from "./8-nun-old-read-entries";

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

function printEntryFiles(handles: FileWithHandleAndPath[]) {
    for (const file of handles) {
        console.log(`%cpath: "${file.path}"%o`, `color: tan`, { file });
    }
}

// export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<FileSystemEntry[]> {
export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<FileWithHandleAndPath[]> {
    /*5* /
    const handles = await collectDndItems(dataTransferItemList);

    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${isFsFileHandle(handle) ? 'tan': 'fuchsia'}`, handle);
    }
    /**/

    /*4* /
    const rv: FileSystemEntry[] = await getAllFileSystemEntries(fileDataTransferItems);
    printFileSystemEntries(rv);
    return rv;
    /**/

    /*7*/
    const rv: FileWithHandleAndPath[] = await getFilesFromDataTransferItems(fileDataTransferItems);
    // const rv: FileWithHandleAndPath[] = await getFilesFromDataTransferItems2(fileDataTransferItems);
    printEntryFiles(rv);
    return rv;
    /**/
}
