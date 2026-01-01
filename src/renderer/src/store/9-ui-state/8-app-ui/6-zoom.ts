import { atom, useSetAtom } from "jotai";
import { R2MInvokes, R2MCalls, hasMain } from "@/xternal-to-main";
import { type R2MParams } from "@shared/ipc-types";
import { useEffect } from "react";

export type ZoomAction = R2MParams.ZoomCommand['action'];

export const zoomLevelAtom = atom(
    (get) => get(_zoomLevelAtom),
    (get, set, action: ZoomAction) => {
        R2MCalls.zoomCommand(action);

        const newLevel = get(_zoomLevelAtom) + (action === 'in' ? 0.5 : action === 'out' ? -0.5 : 0);

        set(_zoomLevelAtom, newLevel);
    }
);

// atom to store the zoom level from the main process

const _zoomLevelAtom = atom(0);

// This is wrong atom should be updated at startup not when atom is mounted
// _zoomLevelAtom.onMount = (set) => {
//     if (hasMain()) {
//         R2MInvokes.getZoomLevel().then(set).catch(console.error);
//     }
// };

// Initial state exchange from renderer to main

export function OnAppMountZoomLevel() {
    const setZoom = useSetAtom(_zoomLevelAtom);
    
    useEffect(
        () => {
            if (hasMain()) {
                R2MInvokes.getZoomLevel().then(setZoom).catch(console.error);
            }
        }, []
    );
    
    return null;
}
