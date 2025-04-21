import { type IpcMainEvent, type IpcMainInvokeEvent, ipcMain } from "electron";
import { type R2M, type R2MInvoke } from "@shared/ipc-types";
import { callFromRendererInMain, invokeFromRendererInMain } from "../../xternal-to-renderer";

export function connect_ListenersForCallFromRenderer() {
    connect_CallMain('call-main', callHandler);
    connect_InvokeMain('invoke-main', invokeHandler);
}

// connect with predefined channel names

function connect_CallMain(channel: PreloadChannelNames, handler: (event: IpcMainEvent, data: any) => void) {
    ipcMain.on(channel, handler);
}

function connect_InvokeMain(channel: PreloadChannelNames, handler: (event: IpcMainInvokeEvent, data: any) => any) {
    ipcMain.handle(channel, handler);
}

// handlers with defined types

function callHandler(_event: IpcMainEvent, data: any) {
    callFromRendererInMain(data as R2M.AllCalls);
}

function invokeHandler(_event: IpcMainInvokeEvent, data: any): any {
    return invokeFromRendererInMain(data as R2MInvoke.AllInvokes);
}
