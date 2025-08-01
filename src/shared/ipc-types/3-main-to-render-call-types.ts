import { type PosTrackerCbType } from "@shared/ipc-types";
import { type MainFileContent } from "./9-file-content";

export namespace M2R { // Main to Renderer

    // menu commands

    export type OpenedFiles = {
        type: 'm2r:loaded-files';
        filesCnt: MainFileContent[];
        emptyFolder: string; // If call open folder and no files found then we return empty folder path
    };

    //

    export type DarkMode = {
        type: 'm2r:dark-mode';
        active: boolean;
    };

    export type ReloadFiles = {
        type: 'm2r:reload-files';
    };

    // napi

    export type DetectionProgress = {
        type: 'm2r:detection-progress';
        progress: number;
    };

    export type PositionProgress = {
        type: 'm2r:position-progress';
        progress: PosTrackerCbType;
    };

    export type SawModeCanceled = {
        type: 'm2r:saw-mode-canceled';
    };

    //

    export type FailedRawContent = {
        type: 'm2r:failed-raw-content';
        body: string;
    };

    export type LogMainToRenderer = {
        type: 'm2r:log';
        body: string;
    };

    // close sequence

    export type AskCloseFromMainWithChanges = {
        type: 'm2r:ask-close-from-main-with-changes';
    };

    export type AllTypes =
        | OpenedFiles

        | DarkMode
        | ReloadFiles

        | DetectionProgress
        | PositionProgress
        | SawModeCanceled
        
        | FailedRawContent
        | LogMainToRenderer

        | AskCloseFromMainWithChanges
        ;
}
