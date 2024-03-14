export type FileContent = {
    id: number;                     // unique ID (as relative time from the start of the app). electron will not provide it, but it will be added in the renderer.
    idx: number;                    // index in the loaded list wo/ counting on filters, i.e. absolute index
    
    fname: string;                  // basename as filename w/ extension but wo/ path
    fpath: string;                  // file full path and filename
    raw: string;                    // file content as it was loaded or error message
    fmodi: number;                  // file.lastModified
    size: number;                   // file size
    
    failed?: boolean;               // if failed the cnt member has error text
    notOur?: boolean;               // load of file content was blocked by allowedExt list.

    entry?: FileSystemFileEntry;    // web: FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file?: File;                    // web: File object from async entry.file() call
    main?: boolean;                 // electron: true if loaded from electron main process, and has full absolute path; can be stored in the main process
};

export const pmAllowedToOpenExt = ['dpm', 'dpn'];
