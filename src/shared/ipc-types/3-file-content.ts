export type FileContent = {
    name: string; // file name wo/ path
    fullPath: string; // file full path and filename
    cnt: string; // file content or error message
    failed?: boolean; // if failed the cnt member has error text
    notOur?: boolean; // load of file content was blocked by allowedExt list.

    entry?: FileSystemFileEntry; // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file?: File; // File object from async entry.file() call
};
