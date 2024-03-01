import { BrowserWindow, dialog } from "electron";
import { winApp } from "../../shell/app/start-main-window/main-window";
import { M2R, M4RInvoke } from "../ipc-types";
import { loadFilesContent } from "../../shell/app/utils-main/load-files";

export function mainToRenderer(data: M2R.RendererCalls) {
    const channel: PreloadChannelNames = 'send-to-renderer';
    winApp?.webContents.send(channel, data);
}

export async function openFileDialog(appWin: BrowserWindow | null | undefined, what: { openDirs: boolean; } = { openDirs: false }) {
    if (!appWin) {
        return;
    }

    try {
        const { canceled, filePaths } = await dialog.showOpenDialog(appWin, {
            properties: [what.openDirs ? 'openDirectory' : 'openFile', 'multiSelections'],
        });
        if (canceled) {
            return;
        }

        const filesCnt = loadFilesContent(filePaths, M4RInvoke.allowedExt);
        mainToRenderer({ type: 'opened-files', filesCnt });
            
    } catch (error) {
        console.error(error);
    }
}
