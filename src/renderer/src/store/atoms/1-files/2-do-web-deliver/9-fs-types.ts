export type FsHandle = FileSystemFileHandle | FileSystemDirectoryHandle;

/*
export function isFsFileHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemFileHandle {
    return handle.kind === 'file';
}

export function isFsDirectoryHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemDirectoryHandle {
    return handle.kind === 'directory';
}
*/

/**
 * Entry type helpers --------------------------------------------------------------
 */

export type FsEntry = FileSystemFileEntry | FileSystemDirectoryEntry;

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
