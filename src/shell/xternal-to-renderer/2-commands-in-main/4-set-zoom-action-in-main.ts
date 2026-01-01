import { appWindow } from "@shell/1-start-main-window";
import { type R2M, type M2R } from "@shared/ipc-types";

const ZOOM_PERCENTAGES = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

export function setZoomActionInMain(action: R2M.SetZoomAction['action']) {
    const wc = appWindow.wnd?.webContents;
    if (!wc) {
        return;
    }

    const currentLevel = wc.getZoomLevel();
    const currentPercent = Math.round(Math.pow(1.2, currentLevel) * 100);
    
    // Find closest percentage
    let closestIndex = 0;
    let minDiff = Number.MAX_VALUE;
    
    for (let i = 0; i < ZOOM_PERCENTAGES.length; i++) {
        const diff = Math.abs(ZOOM_PERCENTAGES[i] - currentPercent);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        } else if (diff === minDiff) {
            // If equal difference, prefer the one that matches direction if possible, 
            // but simply taking the first match or last match (closest) is usually enough.
            // With sorted array, closestIndex will stay at the first occurrence or update if strictly smaller.
        }
    }

    let nextIndex = closestIndex;

    switch (action) {
        case 'in':
            nextIndex = Math.min(closestIndex + 1, ZOOM_PERCENTAGES.length - 1);
            break;
        case 'out':
            nextIndex = Math.max(closestIndex - 1, 0);
            break;
        case 'reset':
            nextIndex = ZOOM_PERCENTAGES.indexOf(100);
            break;
    }

    const newPercent = ZOOM_PERCENTAGES[nextIndex];
    const newLevel = Math.log(newPercent / 100) / Math.log(1.2);

    wc.setZoomLevel(newLevel);

    const msg: M2R.ZoomLevelChanged = {
        type: 'm2r:zoom-level-changed',
        level: newLevel,
    };

    wc.send('send-to-renderer', msg);
}

export function getZoomLevelInMain(): number {
    const wc = appWindow.wnd?.webContents;
    return wc ? wc.getZoomLevel() : 0;
}
