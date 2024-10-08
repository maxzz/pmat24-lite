import { FileWithHandleAndPath, getFilesFromDataTransferItems } from "./2-dnd-w-entries";
import { getAllFileSystemEntries, readAllDirectoryEntries } from "./3-nun-old-read-entries";

export type EntryHandle = {
    legacyEntry: FileSystemFileEntry;
    modernHandle: FileSystemFileHandle | null;
};

type EntryHandleAny = {
    legacyEntry: FileSystemEntry;
    modernHandle: FileSystemHandle | null;
};

function printFileHandles(handles: FileWithHandleAndPath[]) {
    for (const file of handles) {
        console.log(`%cpath: "${file.path}"%o`, `color: ${file.handle?.kind === 'directory' ? 'fuchsia' : 'tan'}`, { file, handle: file.handle });
    }
}

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

    /*1* /
    const res: FileWithHandleAndPath[] = await getFilesFromDataTransferItems(fileDataTransferItems);
    // console.log('resw/ handles', res);
    printFileHandles(res);
    //return res.map((file) => ({ legacyEntry: file.handle, modernHandle: file.handle }));
    return [];
    /**/

    /*2* /
    const fileHandlesPromises = [...dataTransferItemList]
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFileSystemHandle());

    console.log('fileHandlesPromises', fileHandlesPromises); // empty (if call getFilesFromDataTransferItems()) but https://developer.chrome.com/docs/capabilities/web-apis/file-system-access#drag-and-drop-integration OK

    for await (const handle of fileHandlesPromises) {
        // console.log('handle', handle);
        if (handle?.kind === 'directory') {
            console.log(`11 Directory: ${handle.name}`);
        } else {
            console.log(`22 File: ${handle?.name}`);
        }
    }
    /**/

    /*3* /
    const dataTransferItemArr = [...dataTransferItemList];
    console.log('dataTransferItemArr', dataTransferItemArr); // empty (if call getFilesFromDataTransferItems()) but https://developer.chrome.com/docs/capabilities/web-apis/file-system-access#drag-and-drop-integration OK
    /**/

    /*4*/
    const rv: FileSystemEntry[] = await getAllFileSystemEntries(fileDataTransferItems);
    printFileSystemEntries(rv);
    return rv;
    /**/
}
