import { type BrowserWindow, dialog } from "electron";
import { pmAllowedToOpenExt } from "@shared/ipc-types";
import { appendFileSync, existsSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { mainToRenderer } from "../../1-gates-in-main/3-send-in-main-to-renderer";
import { asyncLoadWin32FilesContent } from "./8-load-win32-files";

let agentOpenDlgSeq = 0;

// #region agent log: main open dialog logs
const agentMainSessionId = '327545';
const agentMainFileName = `debug-${agentMainSessionId}.log`;

function agentMainLog(payload: { sessionId: string; runId?: string; hypothesisId?: string; location: string; message: string; data?: unknown; timestamp: number; }) {
    try {
        const baseDir = process.env['INIT_CWD'] || process.cwd();
        const rootDir = findRepoRoot(baseDir);
        const fullPath = resolve(rootDir, agentMainFileName);
        appendFileSync(fullPath, `${JSON.stringify(payload)}\n`, { encoding: 'utf8' });
    } catch { }
}

function findRepoRoot(startDir: string): string {
    let current = startDir || process.cwd();
    for (let i = 0; i < 12; i++) {
        if (existsSync(join(current, '.git')) || existsSync(join(current, 'package.json'))) {
            return current;
        }
        const parent = dirname(current);
        if (!parent || parent === current) {
            break;
        }
        current = parent;
    }
    return startDir;
}
// #endregion

export async function openFileDialogAndReply(appWin: BrowserWindow | null | undefined, what: { openDirs?: boolean; } = { openDirs: false }) {
    if (!appWin) {
        return;
    }

    const seq = ++agentOpenDlgSeq;

    try {
        // #region agent log: showOpenDialog start
        agentMainLog({
            sessionId: agentMainSessionId,
            runId: 'open-folder-pre',
            hypothesisId: 'H_DLG',
            location: 'src/shell/xternal-to-renderer/2-commands-in-main/2-files/1-open-file-dlg.ts:openFileDialogAndReply:start',
            message: 'main open dialog start',
            data: { seq, openDirs: !!what.openDirs },
            timestamp: Date.now(),
        });
        // #endregion

        const { canceled, filePaths } = await dialog.showOpenDialog(appWin, {
            title: what.openDirs ? 'Open Folder' : 'Open Files',
            properties: [what.openDirs ? 'openDirectory' : 'openFile', 'multiSelections'],
        });

        // #region agent log: showOpenDialog result
        agentMainLog({
            sessionId: agentMainSessionId,
            runId: 'open-folder-pre',
            hypothesisId: 'H_DLG',
            location: 'src/shell/xternal-to-renderer/2-commands-in-main/2-files/1-open-file-dlg.ts:openFileDialogAndReply:result',
            message: 'main open dialog result',
            data: { seq, canceled: !!canceled, filePathsLen: filePaths?.length || 0, firstBase: filePaths?.[0] ? basename(filePaths[0]) : undefined },
            timestamp: Date.now(),
        });
        // #endregion

        if (canceled) {
            return;
        }

        const { filesCnt, emptyFolder } = await asyncLoadWin32FilesContent(filePaths, pmAllowedToOpenExt);

        // #region agent log: files loaded
        agentMainLog({
            sessionId: agentMainSessionId,
            runId: 'open-folder-pre',
            hypothesisId: 'H_DLG',
            location: 'src/shell/xternal-to-renderer/2-commands-in-main/2-files/1-open-file-dlg.ts:openFileDialogAndReply:loaded',
            message: 'main open dialog loaded',
            data: { seq, filesCntLen: filesCnt?.length || 0, emptyFolderLen: emptyFolder?.length || 0 },
            timestamp: Date.now(),
        });
        // #endregion

        mainToRenderer({ type: 'm2r:loaded-files', filesCnt, emptyFolder });

    } catch (error) {
        // #region agent log: open dialog exception
        try {
            const msg = error instanceof Error ? error.message : String(error);
            agentMainLog({
                sessionId: agentMainSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_DLG',
                location: 'src/shell/xternal-to-renderer/2-commands-in-main/2-files/1-open-file-dlg.ts:openFileDialogAndReply:exception',
                message: 'main open dialog exception',
                data: { seq, msg },
                timestamp: Date.now(),
            });
        } catch { }
        // #endregion
        console.error(error);
    }
}
