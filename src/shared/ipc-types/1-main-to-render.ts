import { TargetPosition } from "@shell/napi-calls";
import { M4RInvoke } from "./2-render-to-main-invoke";

export namespace M2R { // Main to Renderer

    // menu commands

    export type DarkMode = {
        type: 'm2r:dark-mode';
        active: boolean;
    };

    export type ReloadFiles = {
        type: 'reload-files';
    };

    export type OpenedFiles = {
        type: 'opened-files';
        filesCnt: M4RInvoke.FileContent[];
    };

    export type DetectionProgress = {
        type: 'detection-progress';
        progress: number;
    };

    export type PositionProgress = {
        type: 'position-progress';
        progress: TargetPosition;
    };

    export type FailedRawContent = {
        type: 'failed-raw-content';
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
