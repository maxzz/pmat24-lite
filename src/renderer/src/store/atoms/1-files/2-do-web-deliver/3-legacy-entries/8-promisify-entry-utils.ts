/**
 * Promise adapters ----------------------------------------------------------
 */

// Adapted from: https://stackoverflow.com/a/53058574
// https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/utils/directoryReader.ts
// https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/composables/useUpload.ts
// https://github.com/react-dropzone/file-selector/blob/master/src/file-selector.ts

export async function fileEntryToFilePromisify(entry: FileSystemFileEntry): Promise<File> {
    return new Promise<File>((resolve, reject): void => {
        entry.file(resolve, reject);
    });
}

/**
 * This API should just return a Promise. This method
 * just wraps it and returns a promise.
 * https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry/file
 */
export function getFilePromisify(entry: FileSystemFileEntry): Promise<File> {
    return new Promise((resolve, reject) => {
        entry.file(resolve, reject);
    });
}

/**
 * Same as above. readEntries() has the same dual-callback
 * scheme as .file()
 */
export function getReadEntriesPromisify(dirReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    return new Promise((resolve, reject) => {
        // Edge does not support readEntries, so this
        // will reject the promise.
        // https://caniuse.com/mdn-api_filesystemdirectoryreader_readentries
        dirReader.readEntries(resolve, reject);
    });
}

/**
 * Type helpers --------------------------------------------------------------
 */

/**
 * Doing some type narrowing here. Maybe if the spec had a .kind
 * property that worked as a discriminated union in TypeScript,
 * we could just use an if/else, but here we need to use an explicit
 * assertion to differentiate between file and directory entries.
 */
export function isEntryFile(input: FileSystemEntry): input is FileSystemFileEntry {
    return input.isFile;
}

export function isEntryDirectory(input: FileSystemEntry): input is FileSystemDirectoryEntry {
    return input.isDirectory;
}
