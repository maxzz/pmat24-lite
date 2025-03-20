import { screen, BrowserWindow } from "electron";
import { type SizeInt, type R2M, type RectangleInt } from "@shared/ipc-types";
import { electronState } from "@shell/2-electron-globals";
import { applyZoom, centerRect, getWindowRect, setWindowRect } from "@shell/3-utils-main";

export function setSawModeOnMain(winApp: BrowserWindow | null, { setOn, size }: Omit<R2M.SetSawMode, 'type'>): void {
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

        setWindowRect(winApp, centerRect(saved.rect, applyZoom(size ? size : defaultSize, winApp.webContents.getZoomFactor())));

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

const defaultSize: SizeInt = { width: 350, height: 330, }; // add extra height to the client area for the Windows border and controls, and toaster on top

const saved: { // saved state before saw mode
    rect: RectangleInt;
    title: string;
    maximized: boolean;
} = {
    rect: { x: 0, y: 0, ...defaultSize },
    title: 'PMAT',
    maximized: false,
};
