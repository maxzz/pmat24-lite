import { type TargetClientRect } from "@shared/ipc-types";

export namespace R2M { // Main from Renderer
    
    // menu, load files

    export type MenuCommand = {   // will reply with 'm2r:loaded-files' from dialog
        type: 'r2m:menu:command';
        what: 'exit' | 'open-dev-tools';
    };

    export type LoadManifestsDialog = {   // will reply with 'm2r:loaded-files' from dialog
        type: 'r2m:file:load-manifests-dialog';
        openDirs?: boolean;
    };

    // options, notify

    export type DarkMode = {
        type: 'r2m:dark-mode';
        active: boolean;
    };

    export type NotifyMessage = {
        type: 'r2m:notify';
        message: string;
    };

    // napi

    type NapiOptions = {
        maxControls: number;
    };

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

export namespace R2MParams {
    export type MenuCommand = Omit<R2M.MenuCommand, 'type'>;
    export type LoadManifestsDialog = Omit<R2M.LoadManifestsDialog, 'type'>;
    export type DarkMode = Omit<R2M.DarkMode, 'type'>;
    export type NotifyMessage = Omit<R2M.NotifyMessage, 'type'>;
    export type SetNapiOptions = Omit<R2M.SetNapiOptions, 'type'>;
    export type CancelDetection = Omit<R2M.CancelDetection, 'type'>;
    export type HighlightRect = Omit<R2M.HighlightRect, 'type'>;
    export type LoadTestManifests = Omit<R2M.LoadTestManifests, 'type'>;
    export type StartTestFromMain = Omit<R2M.StartTestFromMain, 'type'>;
}
