import { app, BrowserWindow, ipcMain } from "electron";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { appWindow, connect_ListenersForCallFromRenderer, initMainWindow, setMainWindowListeners } from "../1-start-main-window";
import { iniFileOptions } from "@shell/1-start-main-window/8-ini-file-options";

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(
    () => {
        // Set app user model id for windows
        electronApp.setAppUserModelId('com.electron');

        // IPC test
        // ipcMain.on('ping', () => console.log('pong'));

        iniFileOptions.load();
        createMainWindow();

        app.on('browser-window-created',
            (event: Electron.Event, window: Electron.BrowserWindow) => {
                // Default open or close DevTools by F12 in development
                // and ignore CommandOrControl + R in production.
                // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
                optimizer.watchWindowShortcuts(window, { zoom: true });
            }
        );

        app.on('activate',
            () => {
                // On macOS it's common to re-create a window in the app when the
                // dock icon is clicked and there are no other windows open.
                if (BrowserWindow.getAllWindows().length === 0) {
                    createMainWindow();
                }
            }
        );

        // Quit when all windows are closed, except on macOS. There, it's common
        // for applications and their menu bar to stay active until the user quits
        // explicitly with Cmd + Q.
        app.on('window-all-closed',
            () => {
                appWindow.wnd = null;
                if (process.platform !== 'darwin') {
                    app.quit();
                }
            }
        );

    }
);

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function createMainWindow(): void {
    appWindow.wnd = initMainWindow();
    setMainWindowListeners(appWindow);
}

connect_ListenersForCallFromRenderer();
