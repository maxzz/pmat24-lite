import { type PluginDataCallback } from "./9-types";

// Get Target Window

export type GetTargetWindowParams = {   // i.e. empty object like this '{}'
};

export type GetTargetWindowResult = {   // SAW - Second Active Window
    hwnd: string;                       // "000000000014103E", // hwnd should be string because int64 and js number types are different
    caption: string;                    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;                  // "Chrome_WidgetWin_1",
    process: string;                    // "C:\\Program Files\\Microsoft VS Code\\Code.exe"
    isBrowser: boolean;                 // True if the process is web browser, false otherwise.
};

export interface GetTargetWindow {
    (getTargetWindowParams: string, cb: PluginDataCallback<GetTargetWindowResult>): void;
}
