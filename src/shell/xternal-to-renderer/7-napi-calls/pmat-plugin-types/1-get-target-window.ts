import { type Rect4, type PluginDataCallback } from "./9-types";
import { type WindowControlHighlighterResult } from "./6-highlight-control";

// Get Target Window

export type GetTargetWindowParams = {   // i.e. empty object like this '{}'
};

export type GetTargetWindowResult = {   // SAW - Second Active Window
    hwnd: string;                       // "000000000014103E", // hwnd should be string because int64 and js number types are different
    caption: string;                    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;                  // "Chrome_WidgetWin_1",
    process: string;                    // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
    isBrowser: boolean;                 // True if the process is web browser, false otherwise.
    screenRect: Rect4;                  // Screen rectangle of the window to show as target window for the manifest creation.
};

export interface GetTargetWindow {
    (getTargetWindowParams: string, cb: PluginDataCallback<GetTargetWindowResult>): void;
}

// Hihglight target window
// If window is not found, then error is returned. We don't care about error for window hide call. Only show target window highlight error is important.

export type HighlightTargetWindowParams = {
    hwnd: string;                       // TODO: define as: type Hwnd = string; and comment // "000000000014103E", // hwnd should be string because int64 and js number types are different
    rect: Rect4;             // Screen rectangle of the window to show as target window for the manifest creation.
    showOrHide: boolean;                // True to show, false to hide window.
};

export interface HighlightTargetWindow {
    (highlightTargetWindowParams: string, cb: PluginDataCallback<WindowControlHighlighterResult>): void;
}
