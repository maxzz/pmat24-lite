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

    type Deletefile = {
        type: 'r2mi:delete-file';
        fileName: string;
    };

    type FileExists = {
        type: 'r2mi:file-exists';
        fileName: string;
    };

    type GetUniqueFilename = {
        type: 'r2mi:get-unique-filename';
        fileName: string;
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
        | Deletefile
        | FileExists
        | GetUniqueFilename

        | GetSecondWindowHandle
        | GetSecondWindowContent
        | GetSecondWindowIcon
        | GetSecondWindowMani
        | GetWindowPos
        | GetTlwInfos
        | GetTlwScreenshots
        ;

    export type InvokeResult<T extends R2MInvoke.AllInvokes> =
        T extends DoLoadfiles
        ? string
        : T extends SaveFile
        ? string
        : T extends Deletefile
        ? string
        : T extends FileExists
        ? string
        : T extends GetUniqueFilename
        ? string

        : T extends GetSecondWindowHandle
        ? string
        : T extends GetSecondWindowContent
        ? string
        : T extends GetSecondWindowIcon
        ? string
        : T extends GetSecondWindowMani
        ? string
        : T extends GetWindowPos
        ? string
        : T extends GetTlwInfos
        ? string
        : T extends GetTlwScreenshots
        ? string

        : never;
}
