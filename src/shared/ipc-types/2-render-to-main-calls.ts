import { TargetClientRect } from "@shell/napi-calls";

export namespace M4R { // Main from Renderer
    export type ClientOptions = {
        maxControls: number;
    }

    export type NotifyMessage = {
        type: 'notify';
        message: string;
    };

    export type DarkMode = {
        type: 'dark-mode';
        active: boolean;
    };

    export type SetClientOptions = {
        type: 'set-client-options';
        state: ClientOptions;
    };

    export type CancelDetection = {
        type: 'cancel-detection';
    };

    export type HighlightRect = {
        type: 'highlight-rect';
        hwnd: string;
        rect: TargetClientRect;
    };

    export type ToMainCalls = NotifyMessage | DarkMode | SetClientOptions | CancelDetection | HighlightRect;
}
