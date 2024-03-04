export namespace M4RInvoke { // Main from Renderer invoke and get result
    type DoLoadfiles = {
        type: 'r2mi:load-files';
        filenames: string[];
        allowedExt?: string[];
    };

    type DoLoadfiles2 = {
        type: 'r2mi:load-files2';
        filenames: string[];
    };

    type DoLoadfiles3 = {
        type: 'r2mi:load-files3';
        filenames: string[];
    };

    type GetSecondWindowHandle = {
        type: 'r2mi:get-target-hwnd';
    };

    type GetSecondWindowContent = {
        type: 'r2mi:get-window-controls';
        hwnd: string;
    };

    type GetSecondWindowIcon = {
        type: 'r2mi:get-window-icon';
        hwnd: string;
    };

    type GetSecondWindowMani = {
        type: 'r2mi:get-window-mani';
        hwnd: string;
        wantXml: boolean;
    };

    type GetWindowPos = {
        type: 'r2mi:get-window-pos';
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

    export const allowedExt = ['dpm', 'dpn'];
}
