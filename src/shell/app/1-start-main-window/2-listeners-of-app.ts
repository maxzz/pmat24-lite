import { app, BrowserWindow } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import { appWindow } from "./8-app-window-instance";
import { createAppWindow } from "./1-create-app-window";

export function setAppListeners() {
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
                    createAppWindow();
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
