import { join } from "path";
import { BrowserWindow, shell } from "electron";
import { is } from "@electron-toolkit/utils";
import icon from "../../../../resources/icon.png?asset"; // This is only for linux
import { iniFileOptions } from "./8-ini-file-options";
import { electronState, sessionState } from "@shell/2-electron-globals";
import { mainToRenderer } from "../../xternal-to-renderer";
import { setSawModeOnMain } from "../../xternal-to-renderer/2-commands-in-main";
import { appWindow } from "./0-app-window";

export function createMainWindow(): void {
    iniFileOptions.load();

    appWindow.wnd = makeMainWindow();

    appWindow.wnd.on('ready-to-show', () => {
        if (!appWindow.wnd) {
            return;
        }
        if (iniFileOptions.options?.devTools && !appWindow.wnd.webContents.isDevToolsOpened()) {
            appWindow.wnd.webContents.toggleDevTools();
        }
        appWindow.wnd.show();
    });

    appWindow.wnd.on('close', async (event: Electron.Event) => {
        if (!appWindow.wnd) {
            return;
        }

        if (electronState.sawModeIsOn) {
            event.preventDefault();
            setSawModeOnMain(appWindow.wnd, { setOn: false, position: 0 });
            mainToRenderer({ type: 'm2r:saw-mode-canceled' });
        } else {
            iniFileOptions.save(appWindow.wnd);

            if (sessionState.hasChanges) {
                event.preventDefault();
                mainToRenderer({ type: 'm2r:ask-close-from-main-with-changes' });
            } else {
                appWindow.wnd.destroy();
            }
        }
    });

    appWindow.wnd.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
}

const preloadPath = join(__dirname, "../preload/index.js");

function makeMainWindow(): BrowserWindow {
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
