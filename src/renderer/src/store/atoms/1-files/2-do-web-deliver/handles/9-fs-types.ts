export type FsHandle =
    | { kind: 'file'; } & FileSystemFileHandle
    | { kind: 'directory'; } & FileSystemDirectoryHandle;

export function isFsFileHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemFileHandle {
    return handle.kind === 'file';
}

export function isFsDirectoryHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemDirectoryHandle {
    return handle.kind === 'directory';
}

// FsItem

type FsItemParams = {
    parent?: FileSystemDirectoryHandle | null;
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle | null;
    entry?: FileSystemFileEntry | FileSystemDirectoryEntry | null;
    file?: File | null;
};

export class FsItem {
    parent: FileSystemDirectoryHandle | null = null;
    handle: FileSystemFileHandle | FileSystemDirectoryHandle | null = null;
    entry: FileSystemFileEntry | FileSystemDirectoryEntry | null = null; // legacy entry used in web drag and drop from Firefox
    file: File | null = null;
    
    constructor({ parent, handle, entry, file }: FsItemParams) {
        this.parent = parent || null;
        this.handle = handle || null;
        this.entry = entry || null;
        this.file = file || null;
    }
};
