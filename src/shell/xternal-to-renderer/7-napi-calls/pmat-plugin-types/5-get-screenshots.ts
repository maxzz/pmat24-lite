import { type Base64String, type PluginDataCallback, type ImageFormatType } from "./9-types";

// Common types for Tlw (Top Level Window)

export type TlwData = {
    type: 'data';
    hwnd: string;                       // "000000000014103E", // hwnd should be string because int64 and js number types are different
    caption: string;                    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    classname: string;
    isBrowser: boolean;                 // True if the process is web browser, false otherwise.
    data: Base64String;                 // base64 encoded image data
    width: number;                      // image width in pixels
    height: number;                     // image height in pixels
    format: ImageFormatType;            // "png" or "jpg"
};

export type TlwError = {
    type: 'error';
    hwnd: string;
    errorCode: TlwErrorCode;
    classname: string;
    caption: string
};

export type TlwErrorCode =              // not negative values, to avoid c++ to js conversion issues (long, short, etc)
    | 2                                 // 2 - hwnd not found. This mostly happens when the window is closed.
    | 1;                                // 1 - unknown error. This will mostly be silently ignored.

export type TlwScreenshot = TlwData | TlwError; // Discriminated union of "data" or "error"

// 1. Get a list of top-level windows

export type GetTlwInfoParams = {        //TODO: for type GetTlwInfo param GetNumberOfTLWindowsParams was not defined
};

export type TlwInfo = {
    hwnd: string;
    classname: string;                  // like "Chrome_WidgetWin_1"; that will allow us sort out windows and show browser windows first
    caption: string;                    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    isBrowser: boolean;                 // True if the process is web browser, false otherwise.
};

export type GetTlwInfoResult = {
    windows: TlwInfo[];
};

export interface GetTlwInfos {
    (GetNumberOfTLWindowsParams: string, cb: PluginDataCallback): void;
}

// 2. Get top-level window screenshots

export type GetTlwScreenshotsParams = {
    imageFormat: ImageFormatType;
    width: number;                      // max screenshot width, height - auto
    hwnd?: string[];                    // optional, if provided, only for these hwnds information will be returned
};

export type GetTlwScreenshotsResult = TlwScreenshot[];

export interface GetTlwScreenshots {
    (GetTLWScreenshotsParams: string, cb: PluginDataCallback): void;
}
