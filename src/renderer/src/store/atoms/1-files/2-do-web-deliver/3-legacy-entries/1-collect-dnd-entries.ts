import { FileWithHandleAndPath, getFilesFromDataTransferItems } from "./2-dnd-w-entries";

// function printFileSystemEntries(handles: FileSystemEntry[]) {
//     for (const file of handles) {
//         console.log(`%cpath: "${file.name}"%o`, `color: ${file.isDirectory ? 'fuchsia' : 'tan'}`, { file });
//     }
// }

function printEntryFiles(handles: FileWithHandleAndPath[]) {
    for (const file of handles) {
        console.log(`%cpath: "${file.path}"%o`, `color: tan`, { file });
    }
}

export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<FileWithHandleAndPath[]> {
    const rv: FileWithHandleAndPath[] = await getFilesFromDataTransferItems(fileDataTransferItems);
    printEntryFiles(rv);
    return rv;
}
