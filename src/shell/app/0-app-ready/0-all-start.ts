import { app } from "electron";
import { electronApp } from "@electron-toolkit/utils";
import { connect_ListenersForCallFromRenderer, createAppWindow, setAppListeners, appWindow } from "../1-start-main-window";
import { iniFileOptions } from "@shell/1-start-main-window/8-ini-file-options";

const myAppId = 'com.electron.pmat25.app' + (import.meta.env.DEV ? '-dev' : '');
if (process.platform === 'win32') {
    app.setAppUserModelId(myAppId);
}

const gotTheLock = app.requestSingleInstanceLock();

RunApp();

function RunApp() {
    if (!gotTheLock) {
        console.log('no.lock.second-instance.running');
        app.quit();
        return;
    }
    
    app.on('second-instance', (_event, _commandLine, _workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (appWindow.wnd) {
            if (appWindow.wnd.isMinimized()) {
                appWindow.wnd.restore();
            }
            appWindow.wnd.focus();
        }
    });
    
    // This method will be called when Electron has finished initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(
        () => {
            // Set app user model id for windows
            electronApp.setAppUserModelId(myAppId);
    
            connect_ListenersForCallFromRenderer();
    
            // IPC test
            // ipcMain.on('ping', () => console.log('pong'));
    
            iniFileOptions.load();
            createAppWindow();
    
            setAppListeners();
        }
    );
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
