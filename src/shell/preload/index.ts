import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

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
};

// Use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled,
// otherwise just add to the DOM global.

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('tmApi', api);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
    window.tmApi = api;
}
