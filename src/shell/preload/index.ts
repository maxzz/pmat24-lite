import { type IpcRendererEvent, contextBridge, ipcRenderer, webUtils } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { statSync } from "fs";

// Custom APIs for renderer
const api: TmApi = {
    callMain: (data: any): void => {
        const channel: PreloadChannelNames = 'call-main';
        ipcRenderer.send(channel, data);
    },

    invokeMain: (data: any): any => {
        const channel: PreloadChannelNames = 'invoke-main';
        return ipcRenderer.invoke(channel, data);
    },

    setCbCallFromMain: (callback: (event: IpcRendererEvent, data: any) => void) => {
        const channel: PreloadChannelNames = 'send-to-renderer';
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, callback);
    },

    getPathForFile(file: File): GetFilePathResult { //TODO: maybe make it as a regular invoke call for array of files to avoid load fs module?
        try {
            const filePath = webUtils.getPathForFile(file);
            const isDirectory = filePath ? statSync(filePath).isDirectory() : false; //TODO: we should not use fs module here
            return { filePath, isDirectory, error: undefined };
        } catch (error) {
            console.error(error); // no a file case
            const msg = error instanceof Error ? error.message : `${error}`;
            return { filePath: '', isDirectory: false, error: msg };
        }
    },
};

// Use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled,
// otherwise just add to the DOM global.

if (process.contextIsolated) { // It should be true always from now on.
    try {
        //showStackPreload('Expose tmApi:', api);
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('tmApi', api);
        //showStackPreload('Exposed tmApi:', api);
    } catch (error) {
        console.error(error);
    }
} else {
    throw new Error('contextIsolated should be true always from now on.');
    // // @ts-ignore (define in dts)
    //window.electron = electronAPI;
    // // @ts-ignore (define in dts)
    // window.tmApi = api;
}

function showStackPreload(...rest: any[]) {
    console.groupCollapsed(...rest);
    console.trace();
    console.groupEnd();
}
