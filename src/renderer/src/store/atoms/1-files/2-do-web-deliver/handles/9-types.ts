export type FsHandle =
    | { kind: 'file'; } & FileSystemFileHandle
    | { kind: 'directory'; } & FileSystemDirectoryHandle;

export function isFsFileHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemFileHandle {
    return handle.kind === 'file';
}

export function isFsDirectoryHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemDirectoryHandle {
    return handle.kind === 'directory';
}

export class FsItem {
    parent: FileSystemDirectoryHandle | null = null;
    handle: FileSystemFileHandle | FileSystemDirectoryHandle | null = null;
    entry: FileSystemFileEntry | FileSystemDirectoryEntry | null = null; // legacy entry used in web drag and drop from Firefox
    
    constructor(parent: FileSystemDirectoryHandle | null, handle: FileSystemFileHandle | FileSystemDirectoryHandle | null, entry: FileSystemFileEntry | FileSystemDirectoryEntry | null) {
        this.parent = parent;
        this.handle = handle;
        this.entry = entry;
    }
};
