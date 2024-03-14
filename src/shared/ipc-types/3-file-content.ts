export type FileContent = {
    id: number;                     // unique ID (as relative time from the start of the app). electron will not provide it, but it will be added in the renderer.
    name: string;                   // file name wo/ path
    fullPath: string;               // file full path and filename
    cnt: string;                    // file content or error message
    failed?: boolean;               // if failed the cnt member has error text
    notOur?: boolean;               // load of file content was blocked by allowedExt list.

    entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file?: File;                    // File object from async entry.file() call
};

export const pmAllowedToOpenExt = ['dpm', 'dpn'];
