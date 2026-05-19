import "./utils/x-devtool-install-msg-block";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/0-all-app";
import "./assets/css/index.css";

// #region agent log: debug session start (ipc)
try {
    typeof tmApi !== 'undefined'
        && tmApi.invokeMain({ type: 'r2mi:debug-log', payload: { sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_GLOBAL', location: 'src/renderer/src/main.tsx:startup:ipc', message: 'debug session start', data: { ua: typeof navigator !== 'undefined' ? navigator.userAgent : 'no-navigator' }, timestamp: Date.now(), } }).catch(() => { });
} catch { }
// #endregion

// #region agent log: console.error intercept
try {
    const orig = console.error;
    console.error = (...args: any[]) => {
        try {
            const first = args?.[0];
            const msgRaw = first instanceof Error ? first.message : String(first);
            const msg = msgRaw.length > 500 ? `${msgRaw.slice(0, 500)}…` : msgRaw;

            fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' },
                body: JSON.stringify({
                    sessionId: '327545',
                    runId: 'open-folder-pre',
                    hypothesisId: 'H_CONSOLE',
                    location: 'src/renderer/src/main.tsx:console.error',
                    message: 'console.error',
                    data: { msg, argsLen: Array.isArray(args) ? args.length : undefined },
                    timestamp: Date.now(),
                })
            }).catch(() => { });

            try {
                typeof tmApi !== 'undefined'
                    && tmApi.invokeMain({
                        type: 'r2mi:debug-log',
                        payload: {
                            sessionId: '327545',
                            runId: 'open-folder-pre',
                            hypothesisId: 'H_CONSOLE',
                            location: 'src/renderer/src/main.tsx:console.error:ipc',
                            message: 'console.error',
                            data: { msg, argsLen: Array.isArray(args) ? args.length : undefined },
                            timestamp: Date.now(),
                        }
                    }).catch(() => { });
            } catch { }
        } catch { }

        return orig.apply(console, args as any);
    };
} catch { }
// #endregion

// #region agent log: process uncaught handlers (renderer)
try {
    const proc: any = (globalThis as any).process;
    const redactStack = (stack: unknown): string | undefined => {
        if (typeof stack !== 'string' || !stack) {
            return undefined;
        }
        const lines = stack.split('\n').slice(0, 12).map((l) => {
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
    };

    if (proc?.on && typeof proc.on === 'function') {
        proc.on('uncaughtException', (err: unknown) => {
            try {
                const e = err instanceof Error ? err : new Error(String(err));
                const payload = {
                    name: e.name,
                    message: e.message,
                    stack: redactStack(e.stack),
                    node: proc?.versions?.node,
                };

                fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' },
                    body: JSON.stringify({
                        sessionId: '327545',
                        runId: 'open-folder-pre',
                        hypothesisId: 'H_PROC',
                        location: 'src/renderer/src/main.tsx:process.uncaughtException',
                        message: 'process uncaughtException (renderer)',
                        data: payload,
                        timestamp: Date.now(),
                    })
                }).catch(() => { });

                try {
                    typeof tmApi !== 'undefined'
                        && tmApi.invokeMain({
                            type: 'r2mi:debug-log',
                            payload: {
                                sessionId: '327545',
                                runId: 'open-folder-pre',
                                hypothesisId: 'H_PROC',
                                location: 'src/renderer/src/main.tsx:process.uncaughtException:ipc',
                                message: 'process uncaughtException (renderer)',
                                data: payload,
                                timestamp: Date.now(),
                            }
                        }).catch(() => { });
                } catch { }
            } catch { }
        });

        proc.on('unhandledRejection', (reason: unknown) => {
            try {
                const e = reason instanceof Error ? reason : new Error(String(reason));
                const payload = {
                    name: e.name,
                    message: e.message,
                    stack: redactStack((reason as any)?.stack ?? e.stack),
                    node: proc?.versions?.node,
                };

                fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' },
                    body: JSON.stringify({
                        sessionId: '327545',
                        runId: 'open-folder-pre',
                        hypothesisId: 'H_PROC',
                        location: 'src/renderer/src/main.tsx:process.unhandledRejection',
                        message: 'process unhandledRejection (renderer)',
                        data: payload,
                        timestamp: Date.now(),
                    })
                }).catch(() => { });

                try {
                    typeof tmApi !== 'undefined'
                        && tmApi.invokeMain({
                            type: 'r2mi:debug-log',
                            payload: {
                                sessionId: '327545',
                                runId: 'open-folder-pre',
                                hypothesisId: 'H_PROC',
                                location: 'src/renderer/src/main.tsx:process.unhandledRejection:ipc',
                                message: 'process unhandledRejection (renderer)',
                                data: payload,
                                timestamp: Date.now(),
                            }
                        }).catch(() => { });
                } catch { }
            } catch { }
        });
    }
} catch { }
// #endregion

// #region agent log: window.error
window.addEventListener('error', (event) => {
    fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_GLOBAL', location: 'src/renderer/src/main.tsx:window.error', message: 'window.error', data: { message: event.message, filename: event.filename, lineno: event.lineno, colno: event.colno, stack: event.error instanceof Error ? event.error.stack : undefined }, timestamp: Date.now() }) }).catch(() => { });
});
// #endregion

// #region agent log: window.error (ipc fallback)
window.addEventListener('error', (event) => {
    try {
        typeof tmApi !== 'undefined'
            && tmApi.invokeMain({ type: 'r2mi:debug-log', payload: { sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_GLOBAL', location: 'src/renderer/src/main.tsx:window.error:ipc', message: 'window.error', data: { message: event.message, filename: event.filename, lineno: event.lineno, colno: event.colno, stack: event.error instanceof Error ? event.error.stack : undefined }, timestamp: Date.now(), } }).catch(() => { });
    } catch { }
});
// #endregion

// #region agent log: window.unhandledrejection
window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_GLOBAL', location: 'src/renderer/src/main.tsx:window.unhandledrejection', message: 'window.unhandledrejection', data: reason instanceof Error ? { message: reason.message, stack: reason.stack } : { reasonType: typeof reason, reason: String(reason) }, timestamp: Date.now() }) }).catch(() => { });
});
// #endregion

// #region agent log: window.unhandledrejection (ipc fallback)
window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    try {
        typeof tmApi !== 'undefined'
            && tmApi.invokeMain({ type: 'r2mi:debug-log', payload: { sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_GLOBAL', location: 'src/renderer/src/main.tsx:window.unhandledrejection:ipc', message: 'window.unhandledrejection', data: reason instanceof Error ? { message: reason.message, stack: reason.stack } : { reasonType: typeof reason, reason: String(reason) }, timestamp: Date.now(), } }).catch(() => { });
    } catch { }
});
// #endregion

// #region agent log: window.unhandledrejection aggregate details (fetch)
window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason as unknown;
    const errors =
        reason instanceof AggregateError
            ? reason.errors
            : (reason && typeof reason === 'object' && Array.isArray((reason as { errors?: unknown }).errors))
                ? (reason as { errors: unknown[] }).errors
                : undefined;
    if (!errors?.length) {
        return;
    }

    const summarize = (err: unknown) => {
        if (err instanceof Error) {
            return { name: err.name, message: err.message };
        }
        return { value: String(err) };
    };

    const payload = {
        errorsLen: errors.length,
        errors: errors.slice(0, 5).map(summarize),
    };

    fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' }, body: JSON.stringify({ sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_AGG', location: 'src/renderer/src/main.tsx:window.unhandledrejection:aggregate', message: 'window.unhandledrejection aggregate details', data: payload, timestamp: Date.now() }) }).catch(() => { });

    try {
        typeof tmApi !== 'undefined'
            && tmApi.invokeMain({ type: 'r2mi:debug-log', payload: { sessionId: '327545', runId: 'open-folder-pre', hypothesisId: 'H_AGG', location: 'src/renderer/src/main.tsx:window.unhandledrejection:aggregate:ipc', message: 'window.unhandledrejection aggregate details', data: payload, timestamp: Date.now(), } }).catch(() => { });
    } catch { }
});
// #endregion

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
