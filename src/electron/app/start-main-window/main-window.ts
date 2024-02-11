import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent, app, ipcMain, shell } from "electron";
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import icon from '../../../../resources/icon.png?asset';

export let winApp: BrowserWindow | null;

const preloadPath = join(__dirname, '../preload/index.js');

export async function createWindow() {
    // Create the browser window.
    const winApp = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: preloadPath,
            sandbox: false
        }
    });

    winApp.on('ready-to-show', () => {
        winApp.show();
    });

    winApp.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        winApp.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        winApp.loadFile(join(__dirname, '../renderer/index.html'));
    }
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
