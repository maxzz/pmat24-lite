import { type ManifestForWindowCreatorParams, type GetTlwScreenshotsParams } from "../../shell/xternal-to-renderer/7-napi-calls";

export namespace R2MInvoke { // Main from Renderer invoke and get result

    // load files

    type DoLoadfiles = {
        type: 'r2mi:load-files';
        filenames: string[];
        allowedExt?: string[];
    };
    
    // type DoLoadfiles2 = {
    //     type: 'r2mi:load-files2';
    //     filenames: string[];
    // };
    // type DoLoadfiles3 = {
    //     type: 'r2mi:load-files3';
    //     filenames: string[];
    // };

    // save file

    type SaveFile = {
        type: 'r2mi:save-file';
        fileName: string;               // file name with path
        content: string;
    };

    // napi

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
        params: ManifestForWindowCreatorParams;
    };

    type GetWindowPos = {
        type: 'r2mi:get-window-pos';
        hwnd: string;
    };

    type GetTlwInfos = {
        type: 'r2mi:get-tlw-infos';
    };

    type GetTlwScreenshots = {
        type: 'r2mi:get-tlw-screenshots';
        tlwInfos: GetTlwScreenshotsParams;
    };

    export type AllInvokes =
        | DoLoadfiles
        // | DoLoadfiles2/* | DoLoadfiles3*/
        | SaveFile

        | GetSecondWindowHandle
        | GetSecondWindowContent
        | GetSecondWindowIcon
        | GetSecondWindowMani
        | GetWindowPos
        | GetTlwInfos
        | GetTlwScreenshots
        ;
}
