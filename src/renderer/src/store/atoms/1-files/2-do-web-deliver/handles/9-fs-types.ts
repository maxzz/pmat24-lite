export type FsHandle =
    | { kind: 'file'; } & FileSystemFileHandle
    | { kind: 'directory'; } & FileSystemDirectoryHandle;

export function isFsFileHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemFileHandle {
    return handle.kind === 'file';
}

export function isFsDirectoryHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemDirectoryHandle {
    return handle.kind === 'directory';
}
