import { IpcMainEvent, IpcMainInvokeEvent, ipcMain } from "electron";
import { callFromRendererToMain, invokeFromRendererToMain } from "../../xternal-to-renderer";
import { M4R, M4RInvoke } from "@shared/ipc-types";

export function connect_ListenersForCallFromRenderer() {
    connect_CallMain('call-main', cc);
    connect_InvokeMain('invoke-main', ii);

    // 1. call handlers
    function cc(_event: IpcMainEvent, data: any) {
        callFromRendererToMain(data as M4R.ToMainCalls);
    }
    function connect_CallMain(channel: PreloadChannelNames, handler: (event: IpcMainEvent, data: any) => void) {
        ipcMain.on(channel, handler);
    }
    // 2. invoke handlers
    function ii(_event: IpcMainInvokeEvent, data: any): any {
        return invokeFromRendererToMain(data as M4RInvoke.InvokeCalls);
    }
    function connect_InvokeMain(channel: PreloadChannelNames, handler: (event: IpcMainInvokeEvent, data: any) => any) {
        ipcMain.handle(channel, handler);
    }
}
