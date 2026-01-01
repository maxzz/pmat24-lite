import { atom } from "jotai";
import { R2MInvokes, hasMain } from "@/xternal-to-main";

export const zoomLevelAtom = atom(0);

zoomLevelAtom.onMount = (set) => {
    if (hasMain()) {
        R2MInvokes.getZoomLevel().then(set).catch(console.error);
    }
};
