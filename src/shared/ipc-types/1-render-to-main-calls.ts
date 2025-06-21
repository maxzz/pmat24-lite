export namespace R2M { // Main from Renderer

    // menu, load files

    export type MenuCommand = {
        type: 'r2m:menu:command';
        what: 'exit' | 'open-dev-tools';
    };

    export type LoadManifestsDialog = { // will reply with 'm2r:loaded-files' from dialog
        type: 'r2m:file:load-manifests-dialog';
        openDirs?: boolean;             // dir or file
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

    export type SetSawPosition = {
        type: 'r2m:set-saw-position';
        position: number;              // 0 center, 1 top-left, 2 top-right, 3 bottom-left, 4 bottom-right
    };

    // napi

    export type NapiOptions = {
        maxControls: number;
    };

    export type SetNapiOptions = {      // ui options to control napi calls
        type: 'r2m:set-napi-options';
        state: NapiOptions;
    };

    export type CancelDetection = {
        type: 'r2m:cancel-detection';
    };

    export type SetSawMode = {
        type: 'r2m:set-saw-mode';
        setOn: boolean;
        position: number;              // 0 center, 1 top-left, 2 top-right, 3 bottom-left, 4 bottom-right
        size?: SizeInt;                // This can be provided to override server side position and have the same size on client side.
    };

    export type ShowHideWindow = {
        type: 'r2m:show-hide-window';
        showHide: boolean;              // true - show, false - hide
    };

    export type GetWindowPosAction = {  // For manual mode position tracking inside target window
        type: 'r2m:get-window-pos-action';
        params: 'move' | 'stop';
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
        | SetSawPosition

        | SetNapiOptions
        | CancelDetection
        | SetSawMode
        | ShowHideWindow
        | GetWindowPosAction

        | LoadManifestsDialog
        | StartTestFromMain
        ;
}

export namespace R2MParams {
    export type MenuCommand = Omit<R2M.MenuCommand, 'type'>;
    export type LoadManifestsDialog = Omit<R2M.LoadManifestsDialog, 'type'>;
    export type DarkMode = Omit<R2M.DarkMode, 'type'>;
    export type NotifyMessage = Omit<R2M.NotifyMessage, 'type'>;
    export type SetSawPosition = Omit<R2M.SetSawPosition, 'type'>;
    export type SetNapiOptions = Omit<R2M.SetNapiOptions, 'type'>;
    export type CancelDetection = Omit<R2M.CancelDetection, 'type'>;
    export type SetSawMode = Omit<R2M.SetSawMode, 'type'>;
    export type ShowHideWindow = Omit<R2M.ShowHideWindow, 'type'>;
    export type GetWindowPosAction = Omit<R2M.GetWindowPosAction, 'type'>;
    export type LoadTestManifests = Omit<R2M.LoadTestManifests, 'type'>;
    export type StartTestFromMain = Omit<R2M.StartTestFromMain, 'type'>;
}

// Size, position, and bounds

export type PointInt = { //All nubers must be an integer. Docs: https://electronjs.org/docs/api/structures/rectangle
    x: number;
    y: number;
};

export type SizeInt = { //All nubers must be an integer. Docs: https://electronjs.org/docs/api/structures/rectangle
    width: number;
    height: number;
};

export type RectangleInt = Prettify<PointInt & SizeInt>;
