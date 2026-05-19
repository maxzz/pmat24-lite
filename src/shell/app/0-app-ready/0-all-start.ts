import { app } from "electron";
import { electronApp } from "@electron-toolkit/utils";
import { appendFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { connect_ListenersForCallFromRenderer, createAppWindow, setAppListeners, appWindow } from "../1-start-main-window";
import { iniFileOptions } from "@shell/1-start-main-window/8-ini-file-options";

const myAppId = 'com.electron.pmat25.app' + (import.meta.env.DEV ? '-dev' : '');
if (process.platform === 'win32') {
    app.setAppUserModelId(myAppId);
}

// #region agent log: main process crash + console.error capture
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

try {
    process.on('uncaughtException', (err) => {
        const e = err instanceof Error ? err : new Error(String(err));
        agentMainLog({
            sessionId: agentMainSessionId,
            runId: 'open-folder-pre',
            hypothesisId: 'H_MAIN',
            location: 'src/shell/app/0-app-ready/0-all-start.ts:process.uncaughtException',
            message: 'main uncaughtException',
            data: { name: e.name, msg: e.message },
            timestamp: Date.now(),
        });
    });
} catch { }

try {
    process.on('unhandledRejection', (reason) => {
        const msg = reason instanceof Error ? reason.message : String(reason);
        agentMainLog({
            sessionId: agentMainSessionId,
            runId: 'open-folder-pre',
            hypothesisId: 'H_MAIN',
            location: 'src/shell/app/0-app-ready/0-all-start.ts:process.unhandledRejection',
            message: 'main unhandledRejection',
            data: { msg },
            timestamp: Date.now(),
        });
    });
} catch { }

try {
    const orig = console.error;
    console.error = (...args: any[]) => {
        try {
            const first = args?.[0];
            const msgRaw = first instanceof Error ? first.message : String(first);
            const msg = msgRaw.length > 500 ? `${msgRaw.slice(0, 500)}…` : msgRaw;
            agentMainLog({
                sessionId: agentMainSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_MAIN_CONSOLE',
                location: 'src/shell/app/0-app-ready/0-all-start.ts:console.error',
                message: 'console.error (main)',
                data: { msg, argsLen: Array.isArray(args) ? args.length : undefined },
                timestamp: Date.now(),
            });
        } catch { }

        return orig.apply(console, args as any);
    };
} catch { }
// #endregion

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    console.log('no.lock.second-instance.running');
    app.quit();
} else {
    ContinueRunApp();
}

function ContinueRunApp() {

    app.on('second-instance', (_event, _commandLine, _workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (appWindow.wnd) {
            if (appWindow.wnd.isMinimized()) {
                appWindow.wnd.restore();
            }
            appWindow.wnd.focus();
        }
    });

    // This method will be called when Electron has finished initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(
        () => {
            console.log('main-process-ready'); // This is marker for vscode to start debugger in launch.json. Don't remove this line!

            // Set app user model id for windows
            electronApp.setAppUserModelId(myAppId);

            connect_ListenersForCallFromRenderer();

            // IPC test
            // ipcMain.on('ping', () => console.log('pong'));

            iniFileOptions.load();
            createAppWindow();

            setAppListeners();
        }
    );
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
