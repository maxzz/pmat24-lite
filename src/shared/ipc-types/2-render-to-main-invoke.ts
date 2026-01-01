import { type ManifestForWindowCreatorParams, type GetTlwScreenshotsParams, type Rect4, type WindowHighlighterParams, type DragAndDropParams, type OkIfEmptyString, type PerformCommandParams } from "../../shell/xternal-to-renderer/7-napi-calls/pmat-plugin-types-export";
import { type MainFileContent } from "./9-file-content";
import { type TestInUseParams_Start, type TestInUseParams_Set, type TestInUseResultItem } from "./9-test-inuse";

export namespace R2MInvoke { // Main from Renderer invoke and get result

    // files

    export type DoLoadfiles = {
        type: 'r2mi:load-files';
        filenames: string[];
        allowedExt?: string[];
    };

    export type SaveFile = {
        type: 'r2mi:save-file';
        fileName: string;                       // file name with path
        content: string;
    };

    export type Deletefile = {
        type: 'r2mi:delete-file';
        fileName: string;
    };

    export type ExecFile = {
        type: 'r2mi:exec-file';
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
        fpath: string;                          // full path to file or folder
    };

    export type GetPathInfo = {
        type: 'r2mi:get-path-info';
        filePath: string;                       // full path to check
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

    export type GetWindowPosInit = {
        type: 'r2mi:get-window-pos-init';
        params: DragAndDropParams;
    };

    export type GetTlwInfos = {
        type: 'r2mi:get-tlw-infos';
    };

    export type GetTlwScreenshots = {
        type: 'r2mi:get-tlw-screenshots';
        tlwInfos: GetTlwScreenshotsParams;
    };

    export type HighlightField = {
        type: 'r2mi:highlight-field';
        params?: {                              // If not set, then hide highlighter
            hwnd: string;
            rect?: Rect4;
            accId?: number;                     // We accId (not be profile id) as ordered in manifest (accId does not skip buttons).

            highlightColor?: string;            // Color of the highlighted border, in HTML form #RRGGBB. Default: #FF0000. Do not send #000000 or #008080.
            width?: number;                     // Width of the highlighted border in pixels. Default: 5
            blinks?: number;                    // Number of times to blink the highlighting rectangle. Default: 3; zero means no blick and use hide() to stop hihglighting
        };
    };

    export type HighlightTarget = {
        type: 'r2mi:highlight-target';
        params?: WindowHighlighterParams;       // If not set, then hide highlighter
    };

    export type GetWindowExtras = {
        type: 'r2mi:get-window-extras';
        hwnds: string[];
    };

    export type GeneralInfo = {
        type: 'r2mi:get-general-info';
    };

    export type PerformCommand = {
        type: 'r2mi:perform-command';
        params: PerformCommandParams;
    };

    // test in use

    export type TestInUse_Start = {             // Test in use (Tiu) runs when app starts
        type: 'r2mi:test-in-use-start';
        files: TestInUseParams_Start[];
    };

    export type TestInUse_Set = {               // Test in use (Tiu) runs when need to change inTest status (as usual single file)
        type: 'r2mi:test-in-use-set';
        files: TestInUseParams_Set[];           // Usually it is done for single file. Just in case if UI will have command to set all files to test mode.
    };

    export type TestInUse_DeleteDir = {         // Test in use (Tiu) delete test cache folder and send reloadCache command
        type: 'r2mi:test-in-use-delete-dir';
    };

    export type AllInvokes =
        | DoLoadfiles                           // 'r2mi:load-files'
        | SaveFile                              // 'r2mi:save-file'
        | Deletefile                            // 'r2mi:delete-file'
        | ExecFile                              // 'r2mi:exec-file'
        | FileExists                            // 'r2mi:file-exists'
        | GetUniqueFilename                     // 'r2mi:get-unique-filename'
        | RevealInExplorer                      // 'r2mi:reveal-in-explorer'
        | GetPathInfo                           // 'r2mi:get-path-info'

        | GetSecondWindowHandle                 // 'r2mi:get-target-hwnd'
        | GetSecondWindowContent                // 'r2mi:get-window-controls'
        | GetSecondWindowIcon                   // 'r2mi:get-window-icon'
        | GetSecondWindowMani                   // 'r2mi:get-window-mani'
        | GetWindowPosInit                      // 'r2mi:get-window-pos-init'
        | GetTlwInfos                           // 'r2mi:get-tlw-infos'
        | GetTlwScreenshots                     // 'r2mi:get-tlw-screenshots'
        | HighlightField                        // 'r2mi:highlight-field'
        | HighlightTarget                       // 'r2mi:highlight-target'
        | GetWindowExtras                       // 'r2mi:get-window-extras'

        | GeneralInfo                           // 'r2mi:get-general-info'
        | PerformCommand                        // 'r2mi:perform-command'

        | TestInUse_Start                       // 'r2mi:test-in-use-start'
        | TestInUse_Set                         // 'r2mi:test-in-use-set'
        | TestInUse_DeleteDir                   // 'r2mi:test-in-use-delete-dir'
        ;

    export type EmptyOkOrError = string | undefined;

    export type InvokeResult<T extends R2MInvoke.AllInvokes> =
        T extends DoLoadfiles                   //'r2mi:load-files'
        ? {
            filesCnt: MainFileContent[];
            emptyFolder: string;
            error: string | undefined;
        }

        : T extends SaveFile                    //'r2mi:save-file'
        ? EmptyOkOrError

        : T extends Deletefile                  //'r2mi:delete-file'
        ? EmptyOkOrError

        : T extends ExecFile                    //'r2mi:exec-file'
        ? EmptyOkOrError

        : T extends FileExists                  //'r2mi:file-exists'
        ? {
            exists: boolean;
            error: string;
        }

        : T extends GetUniqueFilename           //'r2mi:get-unique-filename'
        ? {
            newFilename: string;
            error: string;
        }

        : T extends RevealInExplorer            //'r2mi:reveal-in-explorer'
        ? EmptyOkOrError

        : T extends GetPathInfo                 //'r2mi:get-path-info'
        ? {
            filePath: string;
            isDirectory: boolean;
            error: string | undefined;
        }

        // napi

        : T extends GetSecondWindowHandle       //'r2mi:get-target-hwnd'
        ? string

        : T extends GetSecondWindowContent      //'r2mi:get-window-controls'
        ? string

        : T extends GetSecondWindowIcon         //'r2mi:get-window-icon'
        ? string

        : T extends GetSecondWindowMani         //'r2mi:get-window-mani'
        ? string

        : T extends GetWindowPosInit            //'r2mi:get-window-pos-init'
        ? OkIfEmptyString

        : T extends GetTlwInfos                 //'r2mi:get-tlw-infos'
        ? string

        : T extends GetTlwScreenshots           //'r2mi:get-tlw-screenshots'
        ? string

        : T extends HighlightField              //'r2mi:highlight-field'
        ? string

        : T extends HighlightTarget             //'r2mi:highlight-target'
        ? OkIfEmptyString

        : T extends GetWindowExtras             //'r2mi:get-window-extras'
        ? string

        : T extends GeneralInfo                 //'r2mi:get-general-info'
        ? string

        : T extends PerformCommand              //'r2mi:perform-command'
        ? string

        : T extends TestInUse_Start             //'r2mi:test-in-use-start'
        ? string                                // as TestInUseResultItem[]

        : T extends TestInUse_Set               //'r2mi:test-in-use-set'
        ? string                                // as TestInUseResultItem[]

        : T extends TestInUse_DeleteDir         //'r2mi:test-in-use-delete-dir'
        ? EmptyOkOrError                        // as TestInUseResultItem[]

        : never;

} //namespace R2MInvoke

export namespace R2MInvokeParams {
    export type DoLoadfiles = Omit<R2MInvoke.DoLoadfiles, 'type'>;
    export type SaveFile = Omit<R2MInvoke.SaveFile, 'type'>;
    export type Deletefile = Omit<R2MInvoke.Deletefile, 'type'>;
    export type ExecFile = Omit<R2MInvoke.ExecFile, 'type'>;
    export type FileExists = Omit<R2MInvoke.FileExists, 'type'>;
    export type GetUniqueFilename = Omit<R2MInvoke.GetUniqueFilename, 'type'>;
    export type RevealInExplorer = Omit<R2MInvoke.RevealInExplorer, 'type'>;
    export type GetPathInfo = Omit<R2MInvoke.GetPathInfo, 'type'>;
    export type GetSecondWindowHandle = Omit<R2MInvoke.GetSecondWindowHandle, 'type'>;
    export type GetSecondWindowContent = Omit<R2MInvoke.GetSecondWindowContent, 'type'>;
    export type GetSecondWindowIcon = Omit<R2MInvoke.GetSecondWindowIcon, 'type'>;
    export type GetSecondWindowMani = Omit<R2MInvoke.GetSecondWindowMani, 'type'>;
    export type GetWindowPos = Omit<R2MInvoke.GetWindowPosInit, 'type'>;
    export type GetTlwInfos = Omit<R2MInvoke.GetTlwInfos, 'type'>;
    export type GetTlwScreenshots = Omit<R2MInvoke.GetTlwScreenshots, 'type'>;
    export type HighlightField = Omit<R2MInvoke.HighlightField, 'type'>;
    export type HighlightTarget = Omit<R2MInvoke.HighlightTarget, 'type'>;
    export type GetWindowExtras = Omit<R2MInvoke.GetWindowExtras, 'type'>;
    export type TestInUseStart = Omit<R2MInvoke.TestInUse_Start, 'type'>;
    export type TestInUseUpdate = Omit<R2MInvoke.TestInUse_Set, 'type'>;
    export type TestInUseDeleteDir = Omit<R2MInvoke.TestInUse_DeleteDir, 'type'>;
}
