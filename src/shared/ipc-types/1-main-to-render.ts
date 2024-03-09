import { TargetPosition } from "@shared/ipc-types";
import { FileContent } from "./3-file-content";

export namespace M2R { // Main to Renderer

    // menu commands

    export type DarkMode = {
        type: 'm2r:dark-mode';
        active: boolean;
    };

    export type ReloadFiles = {
        type: 'm2r:reload-files';
    };

    export type OpenedFiles = {
        type: 'm2r:opened-files';
        filesCnt: FileContent[];
    };

    export type DetectionProgress = {
        type: 'm2r:detection-progress';
        progress: number;
    };

    export type PositionProgress = {
        type: 'm2r:position-progress';
        progress: TargetPosition;
    };

    export type FailedRawContent = {
        type: 'm2r:failed-raw-content';
        body: string;
    };

    export type LogMainToRenderer = {
        type: 'm2r:log';
        body: string;
    };

    export type MainToRendererCalls =
        | DarkMode
        | ReloadFiles
        | OpenedFiles
        | DetectionProgress
        | FailedRawContent
        | PositionProgress
        | LogMainToRenderer;
}
