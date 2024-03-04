import { TargetPosition } from "@shell/napi-calls";
import { M4RInvoke } from "./2-render-to-main-invoke";

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
        filesCnt: M4RInvoke.FileContent[];
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

    export type RendererCalls =
        | DarkMode
        | ReloadFiles
        | OpenedFiles
        | DetectionProgress
        | FailedRawContent
        | PositionProgress
        | LogMainToRenderer;
}
