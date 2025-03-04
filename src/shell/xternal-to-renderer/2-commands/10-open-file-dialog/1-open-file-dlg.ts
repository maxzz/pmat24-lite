import { type BrowserWindow, dialog } from "electron";
import { pmAllowedToOpenExt } from "@shared/ipc-types";
import { mainToRenderer } from "../../1-gates/3-main-to-renderer";
import { loadWin32FilesContent } from "./2-load-win32-files";

export async function openFileDialogAndReply(appWin: BrowserWindow | null | undefined, what: { openDirs?: boolean; } = { openDirs: false }) {
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

        const filesCnt = loadWin32FilesContent(filePaths, pmAllowedToOpenExt);
        mainToRenderer({ type: 'm2r:loaded-files', filesCnt });
            
    } catch (error) {
        console.error(error);
    }
}
