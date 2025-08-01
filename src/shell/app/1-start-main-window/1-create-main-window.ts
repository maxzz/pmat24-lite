import { join } from "path";
import { BrowserWindow, app, dialog, shell } from "electron";
import { is } from "@electron-toolkit/utils";
import { type IniOptions, loadIniFileOptions, saveIniFileOptions } from "./8-ini-file-options";
import icon from "../../../../resources/icon.png?asset"; // This is only for linux
import { electronState, sessionState } from "@shell/2-electron-globals";
import { mainToRenderer } from "../../xternal-to-renderer";
import { setSawModeOnMain } from "../../xternal-to-renderer/2-commands-in-main";
import { appWindow } from "./0-app-window";

const preloadPath = join(__dirname, "../preload/index.js");

let iniFileOptions: IniOptions | undefined;

export function createMainWindow(): void {
    const iniFileOptions = loadIniFileOptions();

    appWindow.wnd = makeMainWindow();

    appWindow.wnd.on('ready-to-show', () => {
        if (!appWindow.wnd) {
            return;
        }
        if (iniFileOptions?.devTools && !appWindow.wnd.webContents.isDevToolsOpened()) {
            appWindow.wnd.webContents.toggleDevTools();
        }
        appWindow.wnd.show();
    });

    appWindow.wnd.on('close', async (event: Electron.Event) => {
        if (electronState.sawModeIsOn) {
            event.preventDefault();
            setSawModeOnMain(appWindow.wnd, { setOn: false, position: 0 });
            mainToRenderer({ type: 'm2r:saw-mode-canceled' });
        } else {
            if (!appWindow.wnd) {
                return;
            }
            saveIniFileOptions(appWindow.wnd);

            if (sessionState.modifiedFiles) {
                event.preventDefault();
                mainToRenderer({ type: 'm2r:ask-close-from-main-with-changes' });
            } else {
                appWindow.wnd.destroy(); // No unsaved changes, close normally
            }
        }
    });

    appWindow.wnd.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
}

function makeMainWindow(): BrowserWindow {
    const rv = new BrowserWindow({
        ...(iniFileOptions?.bounds),
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
