export type RootDir = {
    handle: FileSystemDirectoryHandle | undefined;  // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    rpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
};

export const rootDir: RootDir = {
    handle: undefined,
    rpath: '',
};

export function setRootDir({ rpath, handle }: { rpath: string, handle?: FileSystemDirectoryHandle; }) {
    rootDir.rpath = rpath;
    rootDir.handle = handle;

    console.log('%csetRootDir', 'color: magenta', rootDir);
}

//TODO: MRU list
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
//      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
//          https://github.com/jakearchibald/idb-keyval
