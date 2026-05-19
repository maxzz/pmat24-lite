import { type IpcRendererEvent, contextBridge, ipcRenderer, webUtils } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { appendFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// Custom APIs for renderer
const api: TmApi = {
    callMain: (data: any): void => {
        const channel: PreloadChannelNames = 'call-main';
        ipcRenderer.send(channel, data);
    },

    invokeMain: (data: any): any => {
        const channel: PreloadChannelNames = 'invoke-main';
        return ipcRenderer.invoke(channel, data);
    },

    setCbCallFromMain: (callback: (event: IpcRendererEvent, data: any) => void) => {
        const channel: PreloadChannelNames = 'send-to-renderer';
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, (event: IpcRendererEvent, data: any) => {
            try {
                // #region agent log: ipcRenderer -> renderer callback
                try {
                    const type = data && typeof data === 'object' ? (data as { type?: unknown }).type : undefined;
                    agentPreloadLog({
                        sessionId: agentPreloadSessionId,
                        runId: 'open-folder-pre',
                        hypothesisId: 'H_IPC_CB',
                        location: 'src/shell/preload/index.ts:setCbCallFromMain:dispatch',
                        message: 'ipc message to renderer',
                        data: { type },
                        timestamp: Date.now(),
                    });
                } catch { }
                // #endregion

                callback(event, data);
            } catch (error) {
                // #region agent log: ipcRenderer callback threw
                try {
                    const e = error instanceof Error ? error : new Error(String(error));
                    const type = data && typeof data === 'object' ? (data as { type?: unknown }).type : undefined;
                    agentPreloadLog({
                        sessionId: agentPreloadSessionId,
                        runId: 'open-folder-pre',
                        hypothesisId: 'H_IPC_CB',
                        location: 'src/shell/preload/index.ts:setCbCallFromMain:dispatch:exception',
                        message: 'renderer callback threw during ipc dispatch',
                        data: { type, name: e.name, msg: redactMessage(e.message), stack: redactStack(e.stack) },
                        timestamp: Date.now(),
                    });
                } catch { }
                // #endregion
                throw error;
            }
        });
    },

    async getPathForFile(file: File): Promise<GetFilePathResult> {
        try {
            const filePath = webUtils.getPathForFile(file);
            if (!filePath) {
                return { filePath: '', isDirectory: false, error: undefined };
            }
            
            // Use IPC to check if path is a directory (avoiding fs module in preload)
            const channel: PreloadChannelNames = 'invoke-main';
            const result = await ipcRenderer.invoke(channel, {
                type: 'r2mi:get-path-info',
                filePath,
            }) as GetFilePathResult;
            
            return result;
        } catch (error) {
            console.error(error); // no a file case
            const msg = error instanceof Error ? error.message : `${error}`;
            return { filePath: '', isDirectory: false, error: msg };
        }
    },
};

// #region agent log: preload crash capture
const agentPreloadSessionId = '327545';
const agentPreloadFileName = `debug-${agentPreloadSessionId}.log`;

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

function redactStack(stack: unknown): string | undefined {
    if (typeof stack !== 'string' || !stack) {
        return undefined;
    }
    const lines = stack.split('\n').slice(0, 16).map((l) => {
        const s = String(l).replace(/\\/g, '/');
        const open = s.lastIndexOf('(');
        const close = s.lastIndexOf(')');
        if (open >= 0 && close > open) {
            const inner = s.slice(open + 1, close);
            const base = inner.split('/').filter(Boolean).pop() || inner;
            return `${s.slice(0, open + 1)}${base}${s.slice(close)}`;
        }
        const parts = s.split(' ');
        const last = parts[parts.length - 1] || '';
        if (last.includes('/')) {
            parts[parts.length - 1] = last.split('/').filter(Boolean).pop() || last;
            return parts.join(' ');
        }
        return s;
    });
    return lines.join('\n');
}

function redactMessage(message: unknown): string {
    const raw = String(message ?? '');
    const s = raw.replace(/\\/g, '/');
    // Replace absolute paths with just basename to avoid PII (usernames).
    const redacted = s.replace(/[A-Za-z]:\/[^\s)'"<>]+/g, (m) => `…/${m.split('/').filter(Boolean).pop() || 'path'}`);
    return redacted.length > 800 ? `${redacted.slice(0, 800)}…` : redacted;
}

function agentPreloadLog(payload: { sessionId: string; runId?: string; hypothesisId?: string; location: string; message: string; data?: unknown; timestamp: number; }) {
    try {
        const baseDir = process.env['INIT_CWD'] || process.cwd();
        const rootDir = findRepoRoot(baseDir);
        const fullPath = resolve(rootDir, agentPreloadFileName);
        appendFileSync(fullPath, `${JSON.stringify(payload)}\n`, { encoding: 'utf8' });
    } catch { }
}

try {
    agentPreloadLog({
        sessionId: agentPreloadSessionId,
        runId: 'open-folder-pre',
        hypothesisId: 'H_PRELOAD',
        location: 'src/shell/preload/index.ts:startup',
        message: 'preload startup',
        data: {
            contextIsolated: !!process.contextIsolated,
            sandboxed: (process as any)?.sandboxed,
            electron: process.versions?.electron,
            node: process.versions?.node,
        },
        timestamp: Date.now(),
    });
} catch { }

try {
    process.on('uncaughtException', (err) => {
        try {
            const e = err instanceof Error ? err : new Error(String(err));
            agentPreloadLog({
                sessionId: agentPreloadSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_PRELOAD',
                location: 'src/shell/preload/index.ts:process.uncaughtException',
                message: 'preload uncaughtException',
                data: { name: e.name, msg: redactMessage(e.message), stack: redactStack(e.stack) },
                timestamp: Date.now(),
            });
        } catch { }
    });
} catch { }

try {
    process.on('unhandledRejection', (reason) => {
        try {
            const e = reason instanceof Error ? reason : new Error(String(reason));
            agentPreloadLog({
                sessionId: agentPreloadSessionId,
                runId: 'open-folder-pre',
                hypothesisId: 'H_PRELOAD',
                location: 'src/shell/preload/index.ts:process.unhandledRejection',
                message: 'preload unhandledRejection',
                data: { name: e.name, msg: redactMessage(e.message), stack: redactStack((reason as any)?.stack ?? e.stack) },
                timestamp: Date.now(),
            });
        } catch { }
    });
} catch { }
// #endregion

// Use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled,
// otherwise just add to the DOM global.

if (process.contextIsolated) { // It should be true always from now on.
    try {
        //showStackPreload('Expose tmApi:', api);
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('tmApi', api);
        //showStackPreload('Exposed tmApi:', api);
    } catch (error) {
        console.error(error);
    }
} else {
    throw new Error('contextIsolated should be true always from now on.');
    // // @ts-ignore (define in dts)
    //window.electron = electronAPI;
    // // @ts-ignore (define in dts)
    // window.tmApi = api;
}

function showStackPreload(...rest: any[]) {
    console.groupCollapsed(...rest);
    console.trace();
    console.groupEnd();
}
