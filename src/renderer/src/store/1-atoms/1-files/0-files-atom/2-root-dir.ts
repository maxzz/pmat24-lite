export type RootDir = {
    rpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
    hadle: FileSystemDirectoryHandle | undefined;   // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    fromMain: boolean;                              // For electron it will be true, for web it will be false.
};

export const rootDir: RootDir = {
    rpath: '',
    hadle: undefined,
    fromMain: false,
};

// All entry points after operations for web and electron: file open; folder open; dnd files; dnd folder 

export function setRootDir({ rpath, dir, fromMain }: { rpath: string, dir: FileSystemDirectoryHandle | undefined; fromMain: boolean; }): void {
    rootDir.rpath = rpath;
    rootDir.hadle = dir;
    rootDir.fromMain = fromMain;
    //printRootDir();
}

function printRootDir() {
    console.log('%c setRootDir ', 'background-color: magenta; color: white', rootDir);
}
