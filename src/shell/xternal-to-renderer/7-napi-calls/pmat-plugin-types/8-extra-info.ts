import { type PluginDataCallback, type Rect4 } from "./9-types";

// Extra info about windows used for fields highlighting

export type WindowExtraParams = {
    hwnds: string[];                    // List of window handles to get extra info for
};

export type WindowExtra = {
    hwnd: string;                       // Window handle from WindowExtraParams.hwnds list
    isClosed: true;                     // True if the window is closed, i.e. not found in the list of asked top-level windows
} | {
    hwnd: string;                       // Window handle from WindowExtraParams.hwnds list
    isClosed: false;                    // True if the window is closed, i.e. not found in the list of asked top-level windows
    isMinimized: boolean;               // True if the window is minimized; We can ask to restore it to show highlight
    screenRect: Rect4;                  // Window screen rect; We can check if window is moved out of screen
    clientRect: Rect4;                  // Window client rect; We can check if highlight is inside this rect
    process: string;                    // Process name; If there multiple windows with the same name (like Login) and classname (like Dialog), we can use process name to distinguish them
};

export type WindowExtraResult = {
    extra: WindowExtra[];
};

export interface GetWindowExtras {
    (WindowExtraParams: string, cb: PluginDataCallback<WindowExtraResult>): void;
}
