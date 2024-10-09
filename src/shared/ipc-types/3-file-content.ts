// WebFsItem exists only for item loaded without electron

type WebFsItemParams = {
    parent?: FileSystemDirectoryHandle | null;
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle | null;
    entry?: FileSystemFileEntry | FileSystemDirectoryEntry | null;
    file?: File | null;
    path?: string;
};

export class WebFsItem {
    parent: FileSystemDirectoryHandle | null = null;
    handle: FileSystemFileHandle | FileSystemDirectoryHandle | null = null;
    entry: FileSystemFileEntry | FileSystemDirectoryEntry | null = null; // legacy entry used in web drag and drop from Firefox
    file: File | null = null;
    path: string;
    
    constructor({ parent, handle, entry, file, path }: WebFsItemParams) {
        this.parent = parent || null;
        this.handle = handle || null;
        this.entry = entry || null;
        this.file = file || null;
        this.path = path || '';
    }
};

// FileContent

export type FileContent = {
    unid: number;                       // unique number ID (as relative time from the start of the app). electron will not provide it, but it will be added in the renderer.
    idx: number;                        // index in the loaded list wo/ counting on filters, i.e. absolute index
    
    fname: string;                      // basename as filename w/ extension but wo/ path
    fpath: string;                      // file full path: for win32 and filename; for web wo/ filename 
    fmodi: number;                      // file.lastModified
    size: number;                       // file size
    raw: string;                        // file content as it was loaded or error message
    
    failed?: boolean;                   // if failed the cnt member has error text
    notOur?: boolean;                   // load of file content was blocked by allowedExt list.
    fromMain?: boolean;                 // electron: true if loaded from electron main process, and has full absolute path; can be stored in the main process

    webFsItem: WebFsItem | null;        // web: for files loaded without electron

    parentHandle?: FileSystemDirectoryHandle; // web: FileSystemDirectoryHandle from drag and drop transfer items
    existingHandle?: FileSystemFileHandle; // web: FileSystemFileHandle from drag and drop transfer items
    webFile?: File;                     // web: File object from async entry.file() call
};

export const pmAllowedToOpenExt = ['dpm', 'dpn'];
