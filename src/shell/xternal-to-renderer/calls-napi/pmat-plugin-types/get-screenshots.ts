import { Base64String, PluginDataCallback } from ".";

// Common types

export type TLWindowsImageFormat = 'png' | 'jpeg';

export type TLWindowsScreenshot = {
    hwnd: string;                       // "000000000014103E", // hwnd should be string because int64 and js number types are different
    caption: string;                    // "ipc-invoke.ts - electron-window-monitor - Visual Studio Code",
    data: Base64String;                 // image data in base64 format
    width: number;                      // image width in pixels
    height: number;                     // image height in pixels
    format: TLWindowsImageFormat;       // "png" or "jpeg"
};

// 1. Get number of Top Level Window (TLWindows)

export type GetNumberOfTLWindowsParams = { // i.e. empty object like this '{}'
};

export type GetNumberOfTLWindowsResult = { totalVisible: number; };

export interface getNumberOfTLWindows {
    (GetNumberOfTLWindowsParams: string, cb: PluginDataCallback): void;
}

// 2. Get all Top Level Window screenshots

export type GetAllTLWindowScreenshotsParams = {
    format: TLWindowsImageFormat;
    width: number;                      // max screenshot width, height - auto
};

export type GetAllTLWindowScreenshotsResult = TLWindowsScreenshot[];

export interface getAllTLWindowScreenshots {
    (GetAllTLWindowScreenshotsParams: string, cb: PluginDataCallback): void;
}

// 3. Get Top Level Window screenshot

export type GetTLWindowScreenshotParams = {
    hwnd: string;                       // as it was aquired from GetNumberOfTLWindowsResult
    format: TLWindowsImageFormat;
    width: number;                      // max screenshot width, height - auto
};

export type GetTLWindowScreenshotResult = TLWindowsScreenshot;

export interface getTLWindowScreenshot {
    (GetTLWindowScreenshotParams: string, cb: PluginDataCallback): void;
}
