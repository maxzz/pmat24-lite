import { type ManifestForWindowCreatorParams, type GetTlwScreenshotsParams, type TargetPosition } from "../../shell/xternal-to-renderer/7-napi-calls";
import { type MainFileContent } from "../ipc-types";

export namespace R2MInvoke { // Main from Renderer invoke and get result

    // load files

    export type DoLoadfiles = {
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

    export type SaveFile = {
        type: 'r2mi:save-file';
        fileName: string;               // file name with path
        content: string;
    };

    export type Deletefile = {
        type: 'r2mi:delete-file';
        fileName: string;
    };

    export type FileExists = {
        type: 'r2mi:file-exists';
        fileName: string;
    };

    export type GetUniqueFilename = {
        type: 'r2mi:get-unique-filename';
        fileName: string;
    };

    export type RevealInExplorer = {
        type: 'r2mi:reveal-in-explorer';
        fpath: string;  // full path to file or folder
    };

    // napi

    export type GetSecondWindowHandle = {
        type: 'r2mi:get-target-hwnd';
    };

    export type GetSecondWindowContent = {
        type: 'r2mi:get-window-controls';
        hwnd: string;
    };

    export type GetSecondWindowIcon = {
        type: 'r2mi:get-window-icon';
        hwnd: string;
    };

    export type GetSecondWindowMani = {
        type: 'r2mi:get-window-mani';
        params: ManifestForWindowCreatorParams;
    };

    export type GetWindowPos = {
        type: 'r2mi:get-window-pos';
        hwnd: string;
    };

    export type GetTlwInfos = {
        type: 'r2mi:get-tlw-infos';
    };

    export type GetTlwScreenshots = {
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
        | RevealInExplorer

        | GetSecondWindowHandle
        | GetSecondWindowContent
        | GetSecondWindowIcon
        | GetSecondWindowMani
        | GetWindowPos
        | GetTlwInfos
        | GetTlwScreenshots
        ;

    type EmptyOkOrError = string | undefined;

    export type InvokeResult<T extends R2MInvoke.AllInvokes> =
        T extends DoLoadfiles                //'r2mi:load-files'cc
        // T['type'] extends 'r2mi:load-files'               //'r2mi:load-files'cc // This is OK but not for now
        ? {
            filesCnt: MainFileContent[];
            emptyFolder: string;
        }

        : T extends SaveFile                 //'r2mi:save-file'cc
        ? EmptyOkOrError

        : T extends Deletefile               //'r2mi:delete-file'
        ? EmptyOkOrError

        : T extends FileExists               //'r2mi:file-exists'cc
        ? {
            exists: boolean;
            error: string;
        }

        : T extends GetUniqueFilename        //'r2mi:get-unique-filename'cc
        ? {
            newFilename: string;
            error: string;
        }

        : T extends RevealInExplorer         //'r2mi:reveal-in-explorer'cc
        ? EmptyOkOrError

        // napi

        : T extends GetSecondWindowHandle    //'r2mi:get-target-hwnd'cc
        ? string

        : T extends GetSecondWindowContent   //'r2mi:get-window-controls'cc
        ? string

        : T extends GetSecondWindowIcon      //'r2mi:get-window-icon'cc
        ? string

        : T extends GetSecondWindowMani      //'r2mi:get-window-mani'cc
        ? string

        : T extends GetWindowPos             //'r2mi:get-window-pos'
        ? TargetPosition

        : T extends GetTlwInfos              //'r2mi:get-tlw-infos'cc
        ? string

        : T extends GetTlwScreenshots        //'r2mi:get-tlw-screenshots'cc
        ? string

        : never;
}
