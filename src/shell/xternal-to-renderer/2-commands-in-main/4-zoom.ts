import { appWindow } from "@shell/1-start-main-window";
import { type R2M } from "@shared/ipc-types";

export function handleZoomCommand(action: R2M.ZoomCommand['action']) {
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
}
