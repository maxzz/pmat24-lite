export type FileContent = {
    id: number;                     // unique ID (as relative time from the start of the app). electron will not provide it, but it will be added in the renderer.
    basename: string;               // filename w/ extension but wo/ path
    fullname: string;               // file full path and filename
    raw: string;                    // file content as it was loaded or error message
    failed?: boolean;               // if failed the cnt member has error text
    notOur?: boolean;               // load of file content was blocked by allowedExt list.

    entry?: FileSystemFileEntry;    // web: FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file?: File;                    // web: File object from async entry.file() call
};

export const pmAllowedToOpenExt = ['dpm', 'dpn'];
