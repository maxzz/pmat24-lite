import { M2R } from "@shared/ipc-types";
import { winApp } from "@shell/1-start-main-window/1-create-main-window";

export function mainToRenderer(data: M2R.AllTypes) {
    const channel: PreloadChannelNames = 'send-to-renderer';
    winApp?.webContents.send(channel, data);
}
