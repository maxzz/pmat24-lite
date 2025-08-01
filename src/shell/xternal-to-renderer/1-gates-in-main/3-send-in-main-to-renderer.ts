import { M2R } from "@shared/ipc-types";
import { appWindow } from "@shell/1-start-main-window";

export function mainToRenderer(data: M2R.AllTypes) {
    const channel: PreloadChannelNames = 'send-to-renderer';
    appWindow.wnd?.webContents.send(channel, data);
}
