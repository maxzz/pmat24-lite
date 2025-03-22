export type RootDir = {
    rpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
    handle: FileSystemDirectoryHandle | undefined;   // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    fromMain: boolean;                              // For electron it will be true, for web it will be false.
};

export const rootDir: RootDir = {
    rpath: '',
    handle: undefined,
    fromMain: false,
};

// All entry points after operations for web and electron: file open; folder open; dnd files; dnd folder 

export function setRootDir({ rpath, handle, fromMain }: { rpath: string, handle: FileSystemDirectoryHandle | undefined; fromMain: boolean; }): void {
    rootDir.rpath = rpath;
    rootDir.handle = handle;
    rootDir.fromMain = fromMain;
    //printRootDir();
}

function printRootDir() {
    console.log('%c setRootDir ', 'background-color: magenta; color: white', rootDir);
}
