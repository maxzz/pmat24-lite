import { join } from "path";
import { BrowserWindow, app, dialog, shell } from "electron";
import { is } from "@electron-toolkit/utils";
import { loadIniFileOptions, saveIniFileOptions } from "./8-ini-file-options";
import icon from "../../../../resources/icon.png?asset"; // This is only for linux
import { electronState, sessionState } from "@shell/2-electron-globals";
import { mainToRenderer } from "../../xternal-to-renderer";
import { setSawModeOnMain } from "../../xternal-to-renderer/2-commands-in-main";

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

    winApp.on('close', async (event: Electron.Event) => {
        if (electronState.sawModeIsOn) {
            event.preventDefault();
            setSawModeOnMain(winApp, { setOn: false, position: 0 });
            mainToRenderer({ type: 'm2r:saw-mode-canceled' });
        } else {
            if (!winApp) {
                return;
            }
            saveIniFileOptions(winApp);

            event.preventDefault();

            //  Check for unsaved changes or other conditions
            const hasUnsavedChanges = sessionState.modifiedFiles;

            /*
            if (hasUnsavedChanges) {
                const choice = await dialog.showMessageBox(winApp, {
                    type: 'question',
                    buttons: ['Save & Close', 'Discard & Close', 'Cancel'],
                    title: 'Confirm Close',
                    message: 'You have unsaved changes. Do you want to save them before closing?',
                });

                if (choice.response === 0) { // Save & Close
                    //  Perform save operation (e.g., send IPC message to renderer to save)
                    //  Then close the window:
                    winApp.destroy();
                } else if (choice.response === 1) { // Discard & Close
                    winApp.destroy();
                }

                //TODO: send it to renderer and get reply (reset sessionState.modifiedFiles) and then close
            } else {
                winApp.destroy(); // No unsaved changes, close normally
            }
            */
        }
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
