import { FileWithHandleAndPath, getFilesFromDataTransferItems } from "./2-dnd-w-entries";
import { readAllDirectoryEntries } from "./3-old-read-entries";

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

export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<EntryHandle[]> {
    /*5* /
    const handles = await collectDndItems(dataTransferItemList);

    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${isFsFileHandle(handle) ? 'tan': 'fuchsia'}`, handle);
    }

    /**/

    /*1*/
    const res: FileWithHandleAndPath[] = await getFilesFromDataTransferItems(fileDataTransferItems);
    // console.log('resw/ handles', res);
    printFileHandles(res);
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

    /*4* /
    const rv: EntryHandle[] = [];
    const queue: EntryHandleAny[] = [];

    for (let i = 0, length = fileDataTransferItems.length; i < length; i++) {
        const item: DataTransferItem = fileDataTransferItems[i];

        const entry = item.webkitGetAsEntry();
        const handle = null;
        // console.log('item', item, 'entry', entry, 'handle', handle);

        entry
            ? queue.push({ legacyEntry: entry, modernHandle: handle })
            : console.error('no entry for item', item);
    }

    while (queue.length > 0) {
        const item = queue.shift();
        // console.log('item', item);
        if (item) {
            if (item.legacyEntry.isFile) {
                rv.push(item as EntryHandle);
            } else if (item.legacyEntry.isDirectory) {
                const dir = item.legacyEntry as FileSystemDirectoryEntry;
                const entries = [...await readAllDirectoryEntries(dir.createReader())].map(
                    (entry) => ({ legacyEntry: entry, modernHandle: null })
                );
                queue.push(...entries);
            }
        }
    }

    return rv;
    /**/
}
