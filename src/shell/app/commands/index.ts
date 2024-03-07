import { BrowserWindow, dialog } from "electron";
import { M4RInvoke } from "@shared/ipc-types";
import { mainToRenderer } from "@shared/ipc-main";
import { loadFilesContent } from "@shell/utils-main/load-files";

export async function openFileDialog(appWin: BrowserWindow | null | undefined, what: { openDirs?: boolean; } = { openDirs: false }) {
    if (!appWin) {
        return;
    }

    try {
        const { canceled, filePaths } = await dialog.showOpenDialog(appWin, {
            title: what.openDirs ? 'Open Folder' : 'Open Files',
            properties: [what.openDirs ? 'openDirectory' : 'openFile', 'multiSelections'],
        });
        if (canceled) {
            return;
        }

        console.log('filePaths', filePaths);

        const filesCnt = loadFilesContent(filePaths, M4RInvoke.allowedExt);
        mainToRenderer({ type: 'm2r:opened-files', filesCnt });
            
    } catch (error) {
        console.error(error);
    }
}
