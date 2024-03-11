import { TargetClientRect } from "@shared/ipc-types";

export namespace R2M { // Main from Renderer
    export type MenuCommand = {   // will reply with 'm2r:loaded-files' from dialog
        type: 'r2m:menu:command';
        what: 'exit' | 'open-dev-tools';
    };

    export type LoadManifestsDialog = {   // will reply with 'm2r:loaded-files' from dialog
        type: 'r2m:file:load-manifests-dialog';
        openDirs?: boolean;
    };

    //

    export type DarkMode = {
        type: 'r2m:dark-mode';
        active: boolean;
    };

    export type NotifyMessage = {
        type: 'r2m:notify';
        message: string;
    };

    //

    export type NapiOptions = {
        maxControls: number;
    };

    // napi

    export type SetNapiOptions = {      // ui options to control napi calls
        type: 'r2m:set-napi-options';
        state: NapiOptions;
    };

    export type CancelDetection = {
        type: 'r2m:cancel-detection';
    };

    export type HighlightRect = {
        type: 'r2m:highlight-rect';
        hwnd: string;
        rect: TargetClientRect;
    };

    // tests

    export type LoadTestManifests = {   // will reply with 'm2r:loaded-files' from dialog
        type: 'r2m:file:load-test-manifests';
    };

    export type StartTestFromMain = {
        type: 'r2m:test';
    };

    export type AllCalls =
        | MenuCommand
        | LoadTestManifests

        | DarkMode
        | NotifyMessage

        | SetNapiOptions
        | CancelDetection
        | HighlightRect

        | LoadManifestsDialog
        | StartTestFromMain
        ;
}
