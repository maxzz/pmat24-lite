export namespace M4RInvoke { // Main from Renderer invoke and get result
    type DoLoadfiles = {
        type: 'load-files';
        filenames: string[];
        allowedExt?: string[];
    };

    type DoLoadfiles2 = {
        type: 'load-files2';
        filenames: string[];
    };

    type DoLoadfiles3 = {
        type: 'load-files3';
        filenames: string[];
    };

    type GetSecondWindowHandle = {
        type: 'get-target-hwnd';
    };

    type GetSecondWindowContent = {
        type: 'get-window-controls';
        hwnd: string;
    };

    type GetSecondWindowIcon = {
        type: 'get-window-icon';
        hwnd: string;
    };

    type GetSecondWindowMani = {
        type: 'get-window-mani';
        hwnd: string;
        wantXml: boolean;
    };

    type GetWindowPos = {
        type: 'get-window-pos';
        hwnd: string;
    };

    export type InvokeCalls =
        | DoLoadfiles 
        | DoLoadfiles2/* | DoLoadfiles3*/ 
        | GetSecondWindowHandle 
        | GetSecondWindowContent 
        | GetSecondWindowIcon 
        | GetSecondWindowMani
        | GetWindowPos;

    export type FileContent = {
        name: string;                   // file name wo/ path
        fullPath: string;               // file full path and filename
        cnt: string;                    // file content or error message
        failed?: boolean;               // if failed the cnt member has error text
        notOur?: boolean;               // load of file content was blocked by allowedExt list.

        entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
        file?: File;                    // File object from async entry.file() call
    };

    export const allowedExt = ['dpm', 'dpn'];
}
