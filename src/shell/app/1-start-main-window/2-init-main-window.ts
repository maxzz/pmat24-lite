import { join } from "path";
import { BrowserWindow } from "electron";
import { is } from "@electron-toolkit/utils";
import icon from "../../../../resources/icon.png?asset"; // This is only for linux
import { iniFileOptions } from "./8-ini-file-options";

const preloadPath = join(__dirname, "../preload/index.mjs");

export function initMainWindow(): BrowserWindow {
    const rv = new BrowserWindow({
        ...(iniFileOptions.options?.bounds),
        minWidth: 200,                  //TODO: this should be set after window created with count on zoomFactor
        minHeight: 140,                 //TODO: this should be set after window created with count on zoomFactor
        //frame: false,                   // OK to turn off caption bar with close button and window drag controls, but we are not ready for this yet
        show: false,                    // Hide window on start
        autoHideMenuBar: true,          // Hide menu bar. Use this to test zoom in/out
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: preloadPath,
            sandbox: false
        }
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    const ELECTRON_RENDERER_URL = process.env['ELECTRON_RENDERER_URL'];

    if (is.dev && ELECTRON_RENDERER_URL) {
        rv.loadURL(ELECTRON_RENDERER_URL);
    } else {
        rv.loadFile(join(__dirname, '../renderer/index.html'));
    }

    return rv;
}
