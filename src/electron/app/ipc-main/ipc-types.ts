export namespace M2R { // Main to Renderer

    // menu commands

    export type DarkMode = {
        type: 'dark-mode';
        active: boolean;
    };
    
    export type ReloadFiles = {
        type: 'reload-files';
    };

    export type OpenedFiles = {
        type: 'opened-files';
        filesCnt: M4RInvoke.FileContent[];
    };

    export type RendererCalls = DarkMode | ReloadFiles | OpenedFiles;
}

export namespace M4R { // Main from Renderer
    export type NotifyMessage = {
        type: 'notify';
        message: string;
    }
    
    export type DarkMode = {
        type: 'dark-mode';
        active: boolean;
    }

    export type ToMainCalls = NotifyMessage | DarkMode;
}

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
    
    export type InvokeCalls = DoLoadfiles | DoLoadfiles2/* | DoLoadfiles3*/;

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
