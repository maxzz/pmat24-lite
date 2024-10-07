import { collectDndHandles, isFsFileHandle } from "./handles";

// Adapted from: https://stackoverflow.com/a/53058574
// https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/utils/directoryReader.ts
// https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/composables/useUpload.ts
// https://github.com/react-dropzone/file-selector/blob/master/src/file-selector.ts

export async function fileEntryToFile(entry: FileSystemFileEntry): Promise<File> {
    return new Promise<File>((resolve, reject): void => {
        entry.file(resolve, reject);
    });
}

async function readEntriesPromise(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    return new Promise((resolve, reject): void => {
        directoryReader.readEntries(resolve, reject);
    });
}

async function readAllDirectoryEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    const rv: FileSystemEntry[] = [];
    let readEntries = await readEntriesPromise(directoryReader);

    while (readEntries.length > 0) {
        rv.push(...readEntries);
        readEntries = await readEntriesPromise(directoryReader);
    }

    return rv;
}

export async function collectDndItems(dataTransferItems: DataTransferItemList) {
    const files = [...dataTransferItems].filter((item) => item.kind === 'file');

    const FirefoxEntries = files.some((item) => !item.getAsFileSystemHandle);
    if (FirefoxEntries) {
        console.log('Firefox entries detected');
        return [];
    }

    const handles = await collectDndHandles(files);

    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${isFsFileHandle(handle) ? 'tan' : 'fuchsia'}`, handle);
    }

    return handles;
}

export type EntryHandle = {
    legacyEntry: FileSystemFileEntry;
    modernHandle: FileSystemFileHandle | null;
};

type EntryHandleAny = {
    legacyEntry: FileSystemEntry;
    modernHandle: FileSystemHandle | null;
};

export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<EntryHandle[]> {
    const rv: EntryHandle[] = [];
    const queue: EntryHandleAny[] = [];

    /*5* /
    const handles = await collectDndItems(dataTransferItemList);

    for (const [path, handle] of handles) {
        console.log(`%cpath: "${path.join('/')}"%o`, `color: ${isFsFileHandle(handle) ? 'tan': 'fuchsia'}`, handle);
    }

    /**/

    /*1* /
    const res: FileWithHandleAndPath[] = await getFilesFromDataTransferItems(dataTransferItemList);
    console.log('resw/ handles', res);
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
    /**/

    return rv;
}

/*
MDN: https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle
async function* getFilesRecursively(entry) {
    if (entry.kind === "file") {
        const file = await entry.getFile();
        if (file !== null) {
            file.relativePath = getRelativePath(entry);
            yield file;
        }
    } else if (entry.kind === "directory") {
        for await (const handle of entry.values()) {
            yield* getFilesRecursively(handle);
        }
    }
}

for await (const fileHandle of getFilesRecursively(directoryHandle)) {
    console.log(fileHandle);
}
*/

export type IFile = File & {
    relativePath?: string[] | null;
};

export async function getFilesFromDir(directoryHandle: FileSystemDirectoryHandle): Promise<IFile[]> {

    async function* getFilesRecursively(entry: FileSystemDirectoryHandle | FileSystemFileHandle) {
        if (entry.kind === 'file') {
            const file: IFile = await entry.getFile();
            if (file !== null) {
                file.relativePath = await directoryHandle.resolve(entry);
                yield file;
            }
        }
        else if (entry.kind === 'directory') {
            for await (const handle of entry.values()) {
                yield* getFilesRecursively(handle as FileSystemDirectoryHandle | FileSystemFileHandle);
            }
        }
    }

    let rv: IFile[] = [];
    for await (const fileHandle of getFilesRecursively(directoryHandle)) {
        rv.push(fileHandle);
    }

    return rv;
}

//TODO:
//https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
//  https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
//      https://github.com/jakearchibald/idb-keyval
