import { FileWithHandleAndPath, getFilesFromDataTransferItems } from "./2-dnd-w-entries";
import { getFilesFromDataTransferItems2 } from "./2-dnd-w-entries-2";

// function printFileHandles(handles: FileWithHandleAndPath[]) {
//     for (const file of handles) {
//         console.log(`%cpath: "${file.path}"%o`, `color: ${file.handle?.kind === 'directory' ? 'fuchsia' : 'tan'}`, { file, handle: file.handle });
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

export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<FileWithHandleAndPath[]> {
    const rv: FileWithHandleAndPath[] = await getFilesFromDataTransferItems(fileDataTransferItems);
    // const rv: FileWithHandleAndPath[] = await getFilesFromDataTransferItems2(fileDataTransferItems);
    printEntryFiles(rv);
    return rv;
}
