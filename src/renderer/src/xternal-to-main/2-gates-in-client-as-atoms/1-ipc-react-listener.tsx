import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { type M2R } from "@shared/ipc-types";
import { doFromMainAtom } from "./2-gate-react-listener-atom";

export const worldStore = {
    listeners: new Set<(data: unknown) => void>(),
    update(data?: unknown) {
        if (!data) {
            return;
        }

        const type = data && typeof data === 'object' ? (data as { type?: unknown }).type : undefined;

        this.listeners.forEach((listener) => {
            try {
                listener(data);
            } catch (error) {
                // #region agent log: worldStore listener threw
                try {
                    const errType = error === null ? 'null' : typeof error;
                    const isError = error instanceof Error;
                    const msg = isError ? error.message : String(error);
                    const stack =
                        isError && typeof error.stack === 'string'
                            ? error.stack
                                .split('\n')
                                .slice(0, 12)
                                .map((l) => String(l).replace(/\\/g, '/').split('/').pop() || l)
                                .join('\n')
                            : undefined;

                    typeof tmApi !== 'undefined'
                        && tmApi.invokeMain({
                            type: 'r2mi:debug-log',
                            payload: {
                                sessionId: '327545',
                                runId: 'open-folder-pre',
                                hypothesisId: 'H_WORLD',
                                location: 'src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/1-ipc-react-listener.tsx:worldStore.update',
                                message: 'worldStore listener threw',
                                data: { type, errType, isError, msg, stack, listeners: this.listeners.size },
                                timestamp: Date.now(),
                            }
                        }).catch(() => { });
                } catch { }
                // #endregion
            }
        });
    }
};

// React connector

export function WorldToReactListener() {
    const doFromMain = useSetAtom(doFromMainAtom);

    useEffect(() => {
        const cb = (data?: unknown) => data && doFromMain(data as M2R.AllTypes);
        worldStore.listeners.add(cb);
        return () => {
            worldStore.listeners.delete(cb); // TODO: we can remove all listeners from HMR.
        };
    }, [doFromMain]);

    return null;
}
