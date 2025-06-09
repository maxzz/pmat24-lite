import { BrowserWindow } from "electron";
import { electronState } from "@shell/2-electron-globals";
import { type SizeInt, type RectangleInt, type R2MParams } from "@shared/ipc-types";
import { applyZoom, centerRect, getWindowRect, relocateRect, setWindowRect } from "@shell/3-utils-main";

export function setSawModeOnMain(winApp: BrowserWindow | null, { setOn, position, size }: R2MParams.SetSawMode): void {
    if (!winApp) {
        return;
    }
    // winApp.hide();

    if (setOn) {
        electronState.sawModeIsOn = true;

        saved.maximized = winApp.isMaximized();
        saved.maximized && winApp.unmaximize();
        saved.rect = getWindowRect(winApp); // this call should go after unmaximize()
        saved.title = winApp.getTitle();

        const newSize = size ? size : defaultSize;
        const zoomRect = relocateRect(saved.rect, applyZoom(newSize, winApp.webContents.getZoomFactor()), position);
        setWindowRect(winApp, zoomRect);

        winApp.setAlwaysOnTop(true, 'pop-up-menu');
        winApp.setTitle('PMAT - Select application');
    } else {
        setWindowRect(winApp, saved.rect);
        saved.maximized && winApp.maximize();

        winApp.setAlwaysOnTop(false);
        winApp.setTitle(saved.title);

        electronState.sawModeIsOn = false;
    }

    // winApp.show();
}

type SavedWindowState = { // saved state before saw mode
    rect: RectangleInt;
    title: string;
    maximized: boolean;
};

const defaultSize: SizeInt = { width: 350, height: 330, }; // add extra height to the client area for the Windows border and controls, and toaster on top

const saved: SavedWindowState = {
    rect: { x: 0, y: 0, ...defaultSize },
    title: 'PMAT',
    maximized: false,
};
