import { app, BrowserWindow, ipcMain } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { connect_MainWindowListeners, createWindow } from './start-main-window/main-window';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    (function () {
        const orginalInfo = console.info;
        console.info = function (...rest: any[]) {
            console.log('info', ...rest);
            if (!/Download the React DevTools/.test(rest[0])) {
                console.log('info match', ...rest);
                orginalInfo.apply(console, rest);
            }
        };
    })();
    

    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    // IPC test
    ipcMain.on('ping', () => console.log('pong'));

    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

connect_MainWindowListeners();

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
