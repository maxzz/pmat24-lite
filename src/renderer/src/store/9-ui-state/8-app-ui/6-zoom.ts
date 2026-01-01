import { atom } from "jotai";
import { R2MInvokes, R2MCalls, hasMain } from "@/xternal-to-main";
import { type R2MParams } from "@shared/ipc-types";

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

_zoomLevelAtom.onMount = (set) => {
    if (hasMain()) {
        R2MInvokes.getZoomLevel().then(set).catch(console.error);
    }
};
