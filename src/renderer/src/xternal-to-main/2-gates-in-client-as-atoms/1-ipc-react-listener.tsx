import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { type M2R } from "@shared/ipc-types";
import { doFromMainAtom } from "./2-gate-react-listener-atom";

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
