export type RootDir = {
    handle: FileSystemDirectoryHandle | undefined;  // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    rpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
};

export const rootDir: RootDir = {
    handle: undefined,
    rpath: '',
};
