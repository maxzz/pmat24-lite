// WebFsItem exists only for item loaded without electron

type WebFsItemParams = {
    parent?: FileSystemDirectoryHandle | null;                              // File system handle of directory
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle | null;       // File system handle of file
    legacyEntry?: FileSystemFileEntry | FileSystemDirectoryEntry | null;    // legacy entry used in web drag and drop from Firefox
    legacyFile?: File | null;                                               // legacy file used in web drag and drop from Firefox
    legacyPath?: string;                                                    // legacy path used in web drag and drop from Firefox
};

export class WebFsItem {
    parent: FileSystemDirectoryHandle | null = null;
    handle: FileSystemFileHandle | FileSystemDirectoryHandle | null = null;
    legacyEntry: FileSystemFileEntry | FileSystemDirectoryEntry | null = null; // legacy entry used in web drag and drop from Firefox
    legacyFile: File | null = null;
    legacyPath: string;
    
    constructor({ parent, handle, legacyEntry: entry, legacyFile: file, legacyPath: path }: WebFsItemParams) {
        this.parent = parent || null;
        this.handle = handle || null;
        this.legacyEntry = entry || null;
        this.legacyFile = file || null;
        this.legacyPath = path || '';
    }
};

export type ChangesSet = Set<string>;

// FileContent

export type FileContent = {
    unid: number;                       // unique number ID (as relative time from the start of the app). electron will not provide it, but it will be added in the renderer.
    idx: number;                        // index in the loaded list wo/ counting on filters, i.e. absolute index
    
    fname: string;                      // basename as filename w/ extension but wo/ path
    fpath: string;                      // FileSystem path without filename (if file fromMain then path is real and w/ Windows backslashes)
    fmodi: number;                      // file.lastModified
    size: number;                       // file size
    raw: string;                        // file content as it was loaded or error message
    
    failed: boolean;                    // if failed the 'raw' member has the error message.
    notOur: boolean;                    // load of file content was blocked by allowedExt list.
    newFile: boolean;                   // new file created in the editor and not saved yet to the file system.
    newAsManual: boolean;               // true only when Saw dialog has selected 'create as a manual manifest' and manifest created.
    fromMain: boolean;                  // electron: true if loaded from electron main process, and has full absolute path; can be stored in the main process

    webFsItem: WebFsItem | null;        // web: for files loaded without electron

    //parentHandle?: FileSystemDirectoryHandle; // web: FileSystemDirectoryHandle from drag and drop transfer items
    //existingHandle?: FileSystemFileHandle; // web: FileSystemFileHandle from drag and drop transfer items
    webFile?: File;                     // web: File object from async entry.file() call

    changesSet: ChangesSet;             // mani editor changes set; created when file selected at top level
};

export type MainFileContent = Omit<FileContent, 'unid' | 'changesSet'>; // main process does not fill unid and changesSet

export const pmAllowedToOpenExt = ['dpm', 'dpn'];
export const pmExtensionMani = 'dpm';   // manifest file extension
export const pmExtensionFc = 'dpn';     // field catalog file extension

