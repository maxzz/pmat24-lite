import { shell } from "electron";
import { iniFileOptions } from "./8-ini-file-options";
import { electronState, sessionState } from "@shell/2-electron-globals";
import { type AppWindow } from "./7-app-window-instance";
import { mainToRenderer } from "../../xternal-to-renderer";
import { setSawModeOnMain } from "../../xternal-to-renderer/2-commands-in-main";
import { testInUseInMain_QuitWithReload } from "../../xternal-to-renderer/2-commands-in-main/3-test-inuse";
import { appendFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// #region agent log: webContents + window lifecycle monitors
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

export function setAppWindowListeners(appWindow: AppWindow) {
    if (!appWindow.wnd) {
        return;
    }

    // #region agent log: attach main window listeners
    try {
        const wc = appWindow.wnd.webContents;

        wc.on('render-process-gone', (_event, details) => {
            agentMainLog({
                sessionId: agentMainSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_WC',
                location: 'src/shell/app/1-start-main-window/3-1-listeners-of-app-window.ts:webContents.render-process-gone',
                message: 'webContents render-process-gone',
                data: { reason: details?.reason, exitCode: details?.exitCode },
                timestamp: Date.now(),
            });
        });

        wc.on('console-message', (_event, level, message, line, sourceId) => {
            try {
                const msgRaw = String(message ?? '');
                const shouldLog = level >= 2 || /uncaught|aggregateerror|unhandled|error/i.test(msgRaw);
                if (!shouldLog) {
                    return;
                }
                const msg = msgRaw.length > 500 ? `${msgRaw.slice(0, 500)}…` : msgRaw;
                const src = sourceId ? String(sourceId).split(/[\\/]/).pop() : undefined;
                agentMainLog({
                    sessionId: agentMainSessionId,
                    runId: 'open-folder-pre',
                    hypothesisId: 'H_WC_CONSOLE',
                    location: 'src/shell/app/1-start-main-window/3-1-listeners-of-app-window.ts:webContents.console-message',
                    message: 'webContents console-message',
                    data: { level, msg, line, sourceId: src },
                    timestamp: Date.now(),
                });
            } catch { }
        });

        wc.on('did-fail-load', (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
            agentMainLog({
                sessionId: agentMainSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_WC',
                location: 'src/shell/app/1-start-main-window/3-1-listeners-of-app-window.ts:webContents.did-fail-load',
                message: 'webContents did-fail-load',
                data: { errorCode, errorDescription, isMainFrame, validatedURL },
                timestamp: Date.now(),
            });
        });

        appWindow.wnd.on('unresponsive', () => {
            agentMainLog({
                sessionId: agentMainSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_WC',
                location: 'src/shell/app/1-start-main-window/3-1-listeners-of-app-window.ts:window.unresponsive',
                message: 'window unresponsive',
                timestamp: Date.now(),
            });
        });

        appWindow.wnd.on('responsive', () => {
            agentMainLog({
                sessionId: agentMainSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_WC',
                location: 'src/shell/app/1-start-main-window/3-1-listeners-of-app-window.ts:window.responsive',
                message: 'window responsive',
                timestamp: Date.now(),
            });
        });
    } catch { }
    // #endregion

    appWindow.wnd.on('ready-to-show', () => {
        if (!appWindow.wnd) {
            return;
        }

        if (iniFileOptions.options?.devTools && !appWindow.wnd.webContents.isDevToolsOpened()) {
            appWindow.wnd?.webContents.openDevTools({ mode: 'detach' }); //appWindow.wnd.webContents.toggleDevTools();
        }
        appWindow.wnd.show();
    });

    appWindow.wnd.on('close', async (event: Electron.Event) => {
        if (!appWindow.wnd) {
            return;
        }

        // #region agent log: window close
        agentMainLog({
            sessionId: agentMainSessionId,
            runId: 'open-folder-pre',
            hypothesisId: 'H_WIN',
            location: 'src/shell/app/1-start-main-window/3-1-listeners-of-app-window.ts:window.close',
            message: 'window close event',
            data: { sawModeIsOn: !!electronState.sawModeIsOn, hasChanges: !!sessionState.hasChanges },
            timestamp: Date.now(),
        });
        // #endregion

        if (electronState.sawModeIsOn) {
            event.preventDefault();

            setSawModeOnMain(appWindow.wnd, { setOn: false, position: 0 });
            mainToRenderer({ type: 'm2r:saw-mode-canceled' });
        } else {
            iniFileOptions.save(appWindow.wnd);

            event.preventDefault();

            if (sessionState.hasChanges) {
                mainToRenderer({ type: 'm2r:ask-close-from-main-with-changes' });
            } else {
                await testInUseInMain_QuitWithReload();
                setTimeout(() => appWindow.wnd!.destroy(), 100);
            }
        }
    });

    appWindow.wnd.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
}
