import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { M2R } from "@shared/ipc-types";
import { sendToMain } from "./to-main-apis";
import { doFromMainAtom } from "./gate-react-listener-atom";
import { debugState } from "../store/state-debug";

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
        const cb = (data?: unknown) => data && doFromMain(data as M2R.AllTypes);
        worldStore.listeners.add(cb);
        return () => {
            worldStore.listeners.delete(cb); // TODO: we can remove all listeners from HMR.
        };
    }, [doFromMain]);

    return null;
}

// Initial state exchange with main process

export function sendNapiOptions() {
    sendToMain({ type: 'r2m:set-napi-options', state: { maxControls: debugState.uiState.maxControls } });
}

export function OnAppMount() {
    useEffect(() => {
        sendNapiOptions();
    }, []);
    return null;
}
