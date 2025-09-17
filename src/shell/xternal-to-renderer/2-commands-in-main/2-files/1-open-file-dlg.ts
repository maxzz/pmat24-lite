import { type BrowserWindow, dialog } from "electron";
import { pmAllowedToOpenExt } from "@shared/ipc-types";
import { mainToRenderer } from "../../1-gates-in-main/3-send-in-main-to-renderer";
import { asyncLoadWin32FilesContent } from "./8-load-win32-files";

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

        const { filesCnt, emptyFolder } = await asyncLoadWin32FilesContent(filePaths, pmAllowedToOpenExt);
        mainToRenderer({ type: 'm2r:loaded-files', filesCnt, emptyFolder });

    } catch (error) {
        console.error(error);
    }
}
