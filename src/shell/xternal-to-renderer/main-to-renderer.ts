import { winApp } from "@shell/start-main-window/main-window";
import { M2R } from "../../shared/ipc-types";

export function mainToRenderer(data: M2R.RendererCalls) {
    const channel: PreloadChannelNames = 'send-to-renderer';
    winApp?.webContents.send(channel, data);
}
