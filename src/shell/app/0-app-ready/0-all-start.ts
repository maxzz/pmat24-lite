import { app } from "electron";
import { electronApp } from "@electron-toolkit/utils";
import { connect_ListenersForCallFromRenderer, createMainWindow, setAppListeners } from "../1-start-main-window";
import { iniFileOptions } from "@shell/1-start-main-window/8-ini-file-options";

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(
    () => {
        // Set app user model id for windows
        electronApp.setAppUserModelId('com.electron');

        connect_ListenersForCallFromRenderer();

        // IPC test
        // ipcMain.on('ping', () => console.log('pong'));

        iniFileOptions.load();
        createMainWindow();

        setAppListeners();
    }
);

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
