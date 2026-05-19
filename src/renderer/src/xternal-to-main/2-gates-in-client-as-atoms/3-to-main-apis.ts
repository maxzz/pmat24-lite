import { type R2MInvoke, type R2M } from "@shared/ipc-types";
import { worldStore } from "./1-ipc-react-listener";
import { showStack } from "@/utils";

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    //showStack('hasMain():', mainApi);
    return !!mainApi;
}

// Subscribe to main process calls

let agentIpcSeq = 0;
const agentRedactStack = (stack: unknown): string | undefined => {
    if (typeof stack !== 'string' || !stack) {
        return undefined;
    }
    return stack
        .split('\n')
        .slice(0, 16)
        .map((l) => {
            const s = String(l).replace(/\\/g, '/');
            const open = s.lastIndexOf('(');
            const close = s.lastIndexOf(')');
            if (open >= 0 && close > open) {
                const inner = s.slice(open + 1, close);
                const base = inner.split('/').filter(Boolean).pop() || inner;
                return `${s.slice(0, open + 1)}${base}${s.slice(close)}`;
            }
            return s;
        })
        .join('\n');
};

mainApi?.setCbCallFromMain((_event: unknown, data: unknown) => {
    const seq = ++agentIpcSeq;
    const type = data && typeof data === 'object' ? (data as { type?: unknown }).type : undefined;

    // #region agent log: renderer cb from main (entry)
    try {
        typeof tmApi !== 'undefined'
            && tmApi.invokeMain({
                type: 'r2mi:debug-log',
                payload: {
                    sessionId: '327545',
                    runId: 'open-folder-pre',
                    hypothesisId: 'H_RCB',
                    location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/3-to-main-apis.ts:setCbCallFromMain:entry',
                    message: 'renderer cb from main entry',
                    data: { seq, type, listeners: worldStore.listeners.size },
                    timestamp: Date.now(),
                }
            }).catch(() => { });
    } catch { }
    // #endregion

    try {
        worldStore.update(data);

        // #region agent log: renderer cb from main (exit)
        try {
            typeof tmApi !== 'undefined'
                && tmApi.invokeMain({
                    type: 'r2mi:debug-log',
                    payload: {
                        sessionId: '327545',
                        runId: 'open-folder-pre',
                        hypothesisId: 'H_RCB',
                        location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/3-to-main-apis.ts:setCbCallFromMain:exit',
                        message: 'renderer cb from main exit',
                        data: { seq, type },
                        timestamp: Date.now(),
                    }
                }).catch(() => { });
        } catch { }
        // #endregion
    } catch (error) {
        // #region agent log: renderer cb from main (exception)
        try {
            const e = error instanceof Error ? error : new Error(String(error));
            typeof tmApi !== 'undefined'
                && tmApi.invokeMain({
                    type: 'r2mi:debug-log',
                    payload: {
                        sessionId: '327545',
                        runId: 'open-folder-pre',
                        hypothesisId: 'H_RCB',
                        location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/3-to-main-apis.ts:setCbCallFromMain:exception',
                        message: 'renderer cb from main exception',
                        data: { seq, type, name: e.name, msg: e.message, stack: agentRedactStack(e.stack) },
                        timestamp: Date.now(),
                    }
                }).catch(() => { });
        } catch { }
        // #endregion
        throw error;
    }
});

/**
 * Call main process API.
 * The result of calls without main are ignored.
 */
export function sendToMainTyped(data: R2M.AllCalls): void {
    mainApi?.callMain(data);
}

/**
 * Invoke main process API.
 * The result of calls without main can be ignored, but the result of invoke is always expected.
 */
export async function invokeMainTyped<TInvoke extends R2MInvoke.AllInvokes>(data: TInvoke): Promise<R2MInvoke.InvokeResult<TInvoke>> {
    if (!mainApi) {
        throw new Error('no.main.api');
    }
    return mainApi.invokeMain<R2MInvoke.AllInvokes, R2MInvoke.InvokeResult<TInvoke>>(data);
}
