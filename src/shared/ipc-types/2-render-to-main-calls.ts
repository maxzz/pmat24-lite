import { TargetClientRect } from "@shared/ipc-types";

export namespace M4R { // Main from Renderer
    export type LoadManifestsDialog = {   // will reply with 'm2r:opened-files' from dialog
        type: 'r2m:file:load-manifests-dialog';
        opendirs?: boolean;
    };

    //

    export type ClientOptions = {
        maxControls: number;
    };

    export type NotifyMessage = {
        type: 'r2m:notify';
        message: string;
    };

    export type DarkMode = {
        type: 'r2m:dark-mode';
        active: boolean;
    };

    export type SetClientOptions = {
        type: 'r2m:set-client-options';
        state: ClientOptions;
    };

    export type CancelDetection = {
        type: 'r2m:cancel-detection';
    };

    export type HighlightRect = {
        type: 'r2m:highlight-rect';
        hwnd: string;
        rect: TargetClientRect;
    };

    //

    export type LoadTestManifests = {   // will reply with 'm2r:opened-files' from dialog
        type: 'r2m:file:load-test-manifests';
    };

    export type StartTestFromMain = {
        type: 'r2m:test';
    };

    export type ToMainCalls =
        | LoadTestManifests

        | NotifyMessage
        | DarkMode
        | SetClientOptions
        | CancelDetection
        | HighlightRect

        | LoadManifestsDialog
        | StartTestFromMain
        ;
}
