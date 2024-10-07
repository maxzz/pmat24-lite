import { isEntryDirectory, isEntryFile, type FsHandle } from "../9-fs-types";
import { getFilePromisify, getReadEntriesPromisify } from "./8-promisify-entry-utils";

/**
 * Derived from 'flat-drop-files'
 * https://github.com/placemark/flat-drop-files/blob/main/index.ts
 * Changes:
 *      1. FileWithHandleAndPath is exported
 *      2. ingnore link can be done outside of the getFilesFromDataTransferItems() function
 *      3. load files content should be conditioned on the file extension
 */

export interface FileWithHandleAndPath extends File {
    handle?: FsHandle | null;
    path: string;
}

/**
 * Derived from 'junk'
 * https://github.com/sindresorhus/junk
 */
/** /
const ignoreList = [
    // # All
    "^npm-debug\\.log$", // Error log for npm
    "^\\..*\\.swp$", // Swap file for vim state

    // # macOS
    "^\\.DS_Store$", // Stores custom folder attributes
    "^\\.AppleDouble$", // Stores additional file resources
    "^\\.LSOverride$", // Contains the absolute path to the app to be used
    "^Icon\\r$", // Custom Finder icon: http://superuser.com/questions/298785/icon-file-on-os-x-desktop
    "^\\._.*", // Thumbnail
    "^\\.Spotlight-V100(?:$|\\/)", // Directory that might appear on external disk
    "\\.Trashes", // File that might appear on external disk
    "^__MACOSX$", // Resource fork

    // # Linux
    "~$", // Backup file

    // # Windows
    "^Thumbs\\.db$", // Image file cache
    "^ehthumbs\\.db$", // Folder config file
    "^Desktop\\.ini$", // Stores custom folder attributes
    "@eaDir$", // Synology Diskstation "hidden" folder where the server stores thumbnails
];

export const junkRegex = new RegExp(ignoreList.join("|"));
/**/

type LoadFilter = (filename: string) => boolean; // filename wo/ path; returns true if the file content should be loaded
const defaultLoadFilter: LoadFilter = (filename: string) => true; // load all files 
let currentLoadFilter: LoadFilter = defaultLoadFilter; // we can make scopeed or member on getFilesFromEntry(), but so far its OK.

/**
 * There are a bunch of similar-looking things here.
 *
 * - DataTransferItem: something that is _directly_ selected in a
 *   drag & drop operation. Can be a file, folder, or string.
 * - FileSystemEntry: only refers to a file or folder, but
 *   unlike a DataTransferItem, you can get a FileSystemEntry
 *   by traversing the files in a folder (files that were
 *   not explicitly selected). This is also the way
 *   that you can get a FileSystemHandle.
 * - File: the way that you can actually read a file. You can
 *   get a File object from a DataTransferItem directly with .getAsFile(), or
 *   from a FileSystemEntry with .file(). The File object is
 *   very similar to the Blob object.
 * - FileSystemFileHandle: an object that lets you read from
 *   and write to a file on a user's hard drive. This is so that,
 *   for example, you can hit Cmd+S and save back to the
 *   file that you opened.
 */

/**
 * A few things this doesn't do but might want to in the future:
 *
 * - Get handles for directories, and add directories to the list.
 *   With a directory handle, you can save into a directory.
 */

/**
 * Promise adapters ----------------------------------------------------------
 */

function getHandle(item: DataTransferItem | undefined): Promise<FsHandle | null> {
    if (!item || !item.getAsFileSystemHandle) { // Currently only Chromium browsers support getAsFileSystemHandle.
        return Promise.resolve(null);
    }
    const rv = item.getAsFileSystemHandle().catch((e) => { console.error(e); return null; }) as Promise<FsHandle | null>;
    return rv;
}

function getFileAccess(entry: FileSystemFileEntry, item: DataTransferItem | undefined, path: string): Promise<FileWithHandleAndPath> {
    return Promise.all([
        getFilePromisify(entry),
        getHandle(item)
    ]).then(
        ([file, handle]) => {
            (file as FileWithHandleAndPath).handle = handle;
            (file as FileWithHandleAndPath).path = path + file.name;
            return file as FileWithHandleAndPath;
        }
    );
}

async function dirReadEntries(dirReader: FileSystemDirectoryReader, path: string): Promise<FileWithHandleAndPath[]> {
    return getReadEntriesPromisify(dirReader).then(
        (entries) => {
            /**
             * Recursion here! getFilesFromEntry will,
             * for a directory, call readDir, which will call dirReadEntries all
             * over again.
             */
            const getFilesPromises = entries.map(
                (entry) => getFilesFromEntry(entry, undefined, path)
            );

            return Promise.all(getFilesPromises).then((nested) => nested.flat());
        }
    );
}

/**
 * This method is odd because
 *
 * - The .readEntries method only returns batches of 100,
 *   and signals when it's done because it returns a batch of 0.
 */
async function readDir(entry: FileSystemDirectoryEntry, path: string, item: DataTransferItem | undefined): Promise<FileWithHandleAndPath[]> {
    const dirReader = entry.createReader();
    const newPath = path + entry.name + "/";
    let files: FileWithHandleAndPath[] = [];
    let newFiles: FileWithHandleAndPath[];

    if (item) {
        const handle = await getHandle(item) as FileSystemDirectoryHandle | null;
        if (handle) {
            (entry as any).handle = handle;
            console.log('dir handle', handle);

            // const entries = getEntriesRecursively(handle);
            // for await (const [key, value] of entries) {
            //     console.log('children all', { key, value });
            // }

            for await (const [key, value] of handle.entries()) {
                console.log('children', { key, value }); // <- children { key: '{10250eb8-d616-4370-b3ab-39aedb8c6950}.dpm', value: FileSystemFileHandle }
            }
        }
    }

    do {
        newFiles = await dirReadEntries(dirReader, newPath);
        files = files.concat(newFiles);
    } while (newFiles.length > 0);
    return files;
}

/**
 * Really nothing here but a method that routes to readFile or readDir.
 */
function getFilesFromEntry(entry: FileSystemEntry, item: DataTransferItem | undefined, path = ""): Promise<FileWithHandleAndPath[]> {
    if (isEntryFile(entry)) {
        if (currentLoadFilter(entry.name)) {
            return getFileAccess(entry, item, path).then((file) => [file]);
        }
    }
    else if (isEntryDirectory(entry)) {
        return readDir(entry, path, item);
    }
    return Promise.resolve([]);
}

export function getFilesFromDataTransferItems(files: DataTransferItem[], loadFilter?: LoadFilter): Promise<FileWithHandleAndPath[]> {
    currentLoadFilter = loadFilter || defaultLoadFilter;

    // const inputs: [FileSystemEntry, DataTransferItem][] = [];

    /**
     * It is ESSENTIAL that we do not do any async work in
     * this loop, because if we do the files(DataTransferItemsList) list
     * will disappear. So collect all the items and entries,
     * and then do all the async.
     */
    // for (const item of files) {
    //     const entry = item.webkitGetAsEntry(); // Despite the name, webkitGetAsEntry is in Safari, Chrome, Edge, and Firefox.
    //     if (entry) {
    //         inputs.push([entry, item]);
    //     }
    // }
    const inputs = files.map(
        (item) => [item.webkitGetAsEntry(), item] as [FileSystemEntry, DataTransferItem]
    ).filter((item) => !!item[0]);
    console.log('inputs', inputs);

    /**
     * Danger zone here. It's tempting to refactor this to a loop
     * with await. However, that'll break our ability to get file handles.
     * Promise.all is able to get all of the handles on the same
     * tick, whereas if you attempt to get multiple file handles
     * in multiple ticks, you'll lose the ability to get a file
     * handle after getting the first one.
     */
    return Promise.all(
        inputs.map(([entry, item]) => getFilesFromEntry(entry, item))
    ).then((nested) => {
        return nested.flat(); // return nested.flat().filter((file) => !junkRegex.test(file.name));
    });
}
