import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { M2R } from "@shared/ipc-types";
import { doFromMainAtom } from "./gate-react-listener-atom";

import { sendToMain } from "../../renderer/src/store";
import { appUi } from "../../renderer/src/store/app-state";

export const worldStore = {
    listeners: new Set<(data: unknown) => void>(),
    update(data?: unknown) {
        data && this.listeners.forEach((listener) => listener(data));
    }
};

// React connector

export function WorldToReactListener() {
    const doFromMain = useSetAtom(doFromMainAtom);

    useEffect(() => {
        const cb = (data?: unknown) => data && doFromMain(data as M2R.RendererCalls);
        worldStore.listeners.add(cb);
        return () => {
            worldStore.listeners.delete(cb); // TODO: we can remove all listeners from HMR.
        };
    }, [doFromMain]);

    return null;
}

// Initial state exchange with main

export function sendClientOptions() {
    sendToMain({ type: 'r2m:set-client-options', state: { maxControls: appUi.uiState.maxControls } });
}

export function OnAppMount() {
    useEffect(() => {
        sendClientOptions();
    }, []);
    return null;
}
