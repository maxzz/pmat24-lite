export type RootDir = {
    dir: FileSystemDirectoryHandle | undefined;  // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    rpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
    fromMain: boolean;                              // For electron it will be true, for web it will be false.
};

export const rootDir: RootDir = {
    dir: undefined,
    rpath: '',
    fromMain: false,
};

export function setRootDir({ rpath, handle }: { rpath: string, handle: FileSystemDirectoryHandle | undefined; fromMain: boolean; }): void {
    rootDir.rpath = rpath;
    rootDir.dir = handle;

    console.log('%csetRootDir', 'color: magenta', rootDir);
}

//TODO: MRU list
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
//      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
//          https://github.com/jakearchibald/idb-keyval
