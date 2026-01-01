import { appWindow } from "@shell/1-start-main-window";
import { type R2M, type M2R } from "@shared/ipc-types";

export function setZoomActionInMain(action: R2M.SetZoomAction['action']) {
    const wc = appWindow.wnd?.webContents;
    if (!wc) {
        return;
    }

    const currentLevel = wc.getZoomLevel();
    let newLevel = currentLevel;

    switch (action) {
        case 'in':
            newLevel = currentLevel + 0.5;
            break;
        case 'out':
            newLevel = currentLevel - 0.5;
            break;
        case 'reset':
            newLevel = 0;
            break;
    }

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
