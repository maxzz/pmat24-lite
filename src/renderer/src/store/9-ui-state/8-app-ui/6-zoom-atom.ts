import { atom, useSetAtom } from "jotai";
import { R2MInvokes, R2MCalls, hasMain } from "@/xternal-to-main";
import { type R2MParams } from "@shared/ipc-types";
import { useEffect } from "react";

export type ZoomAction = R2MParams.SetZoomAction['action'];

export const zoomLevelAtom = atom(0);

export const zoomActionAtom = atom(
    null,
    (get, set, action: ZoomAction) => {
        
        // No need optimistic update because main will update the level and calculations will be done in one place on server side.
        /*
        // Optimistic update
        let newLevel = get(zoomLevelAtom);
        if (action === 'in') { newLevel += 0.5; } 
        else if (action === 'out') { newLevel -= 0.5; } 
        else { newLevel = 0; }
        set(zoomLevelAtom, newLevel);
        */

        // Send command
        R2MCalls.setZoomAction(action);
    }
);

// Initial state exchange from renderer to main

export function OnAppMountGetZoomLevel() {
    const setZoom = useSetAtom(zoomLevelAtom);
    
    useEffect(
        () => {
            if (hasMain()) {
                R2MInvokes.getZoomLevel().then(setZoom).catch(console.error);
            }
        }, []
    );
    
    return null;
}
