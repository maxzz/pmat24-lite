import { IpcMainEvent, IpcMainInvokeEvent, ipcMain } from "electron";
import { callFromRendererToMain, invokeFromRendererToMain } from "../../xternal-to-renderer";
import { R2M, R2MInvoke } from "@shared/ipc-types";

export function connect_ListenersForCallFromRenderer() {
    connect_CallMain('call-main', cc);
    connect_InvokeMain('invoke-main', ii);

    // 1. call handlers
    function cc(_event: IpcMainEvent, data: any) {
        callFromRendererToMain(data as R2M.AllCalls);
    }
    function connect_CallMain(channel: PreloadChannelNames, handler: (event: IpcMainEvent, data: any) => void) {
        ipcMain.on(channel, handler);
    }
    // 2. invoke handlers
    function ii(_event: IpcMainInvokeEvent, data: any): any {
        return invokeFromRendererToMain(data as R2MInvoke.AllInvokes);
    }
    function connect_InvokeMain(channel: PreloadChannelNames, handler: (event: IpcMainInvokeEvent, data: any) => any) {
        ipcMain.handle(channel, handler);
    }
}
