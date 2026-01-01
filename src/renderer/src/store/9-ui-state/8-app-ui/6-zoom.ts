import { atom } from "jotai";
import { R2MInvokes, R2MCalls, hasMain } from "@/xternal-to-main";
import { type R2MParams } from "@shared/ipc-types";

export type ZoomAction = R2MParams.ZoomCommand['action'];

const _zoomLevelAtom = atom(0);

_zoomLevelAtom.onMount = (set) => {
    if (hasMain()) {
        R2MInvokes.getZoomLevel().then(set).catch(console.error);
    }
};

export const zoomLevelAtom = atom(
    (get) => get(_zoomLevelAtom),
    (get, set, action: ZoomAction) => {
        R2MCalls.zoomCommand(action);

        const currentLevel = get(_zoomLevelAtom);
        let newLevel = currentLevel;
        
        if (action === 'in') newLevel += 0.5;
        else if (action === 'out') newLevel -= 0.5;
        else newLevel = 0;
        
        set(_zoomLevelAtom, newLevel);
    }
);
