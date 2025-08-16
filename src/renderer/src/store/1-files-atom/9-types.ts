export type PmatFolder = {
    fpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
    handle: FileSystemDirectoryHandle | undefined;  // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    fromMain: boolean;                              // For electron it will be true, for web it will be false.
};
