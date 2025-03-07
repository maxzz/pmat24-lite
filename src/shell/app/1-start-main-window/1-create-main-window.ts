import { join } from "path";
import { BrowserWindow, app, shell } from "electron";
import { is } from "@electron-toolkit/utils";
import { loadIniFileOptions, saveIniFileOptions } from "./8-ini-file-options";
import icon from "../../../../resources/icon.png?asset"; // This is only for linux
import { electronState } from "@shell/2-electron-globals";
import { mainToRenderer } from "../../xternal-to-renderer";
import { setSawModeOnMain } from "../../xternal-to-renderer/2-commands";

const preloadPath = join(__dirname, "../preload/index.js");

export let winApp: BrowserWindow | null;

export async function createMainWindow() {
    const iniFileOptions = loadIniFileOptions();

    // Create the browser window.
    winApp = new BrowserWindow({
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
        winApp.loadURL(ELECTRON_RENDERER_URL);
    } else {
        winApp.loadFile(join(__dirname, '../renderer/index.html'));
    }

    winApp.on('ready-to-show', () => {
        if (iniFileOptions?.devTools && !winApp?.webContents.isDevToolsOpened()) {
            winApp?.webContents.toggleDevTools();
        }
        winApp?.show();
    });

    winApp.on('close', (e: Electron.Event) => {
        if (electronState.sawModeIsOn) {
            e.preventDefault();
            setSawModeOnMain(winApp, { setOn: false });
            mainToRenderer({ type: 'm2r:saw-mode-canceled' });
            return;
        }
        winApp && !electronState.sawModeIsOn && saveIniFileOptions(winApp);
    });

    winApp.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
}

export function connect_MainWindowListeners() {

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
        winApp = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}
