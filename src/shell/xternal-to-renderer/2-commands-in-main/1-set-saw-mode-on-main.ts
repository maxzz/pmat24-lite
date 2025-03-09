import { screen, BrowserWindow } from "electron";
import { type SizeInt, type R2M, type RectangleInt } from "@shared/ipc-types";
import { electronState } from "@shell/2-electron-globals";

export function setSawModeOnMain(winApp: BrowserWindow | null, { setOn, size }: Omit<R2M.SetSawMode, 'type'>): void {
    if (!winApp) {
        return;
    }
    winApp.hide();

    if (setOn) {
        electronState.sawModeIsOn = true;

        saved.maximized = winApp.isMaximized();
        saved.maximized && winApp.unmaximize();
        saved.rect = getWindowRect(winApp); // this call should go after unmaximize()
        saved.title = winApp.getTitle();

        setWindowRect(winApp, centerRect(saved.rect, applyZoom(size ? size : defaultSize, winApp.webContents.getZoomFactor())));

        winApp.setAlwaysOnTop(true);
        winApp.setTitle('PMAT - Select application');
    } else {
        winApp.setAlwaysOnTop(false);
        winApp.setTitle(saved.title);

        setWindowRect(winApp, saved.rect);
        saved.maximized && winApp.maximize();

        electronState.sawModeIsOn = false;
    }
    
    winApp.show();
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

function getWindowRect(win: BrowserWindow): Electron.Rectangle {
    const pos = win.getPosition();
    const size = win.getSize();
    return { x: pos[0], y: pos[1], width: size[0], height: size[1] };
}

function setWindowRect(win: BrowserWindow, rect: Electron.Rectangle) {
    win.setPosition(Math.round(rect.x), Math.round(rect.y));
    win.setSize(Math.round(rect.width), Math.round(rect.height));
}

function centerRect(currentRect: RectangleInt, size: SizeInt): RectangleInt {
    const display = screen.getDisplayMatching(currentRect) || screen.getDisplayNearestPoint(currentRect);
    return {
        x: display.bounds.x + display.bounds.width / 2 - size.width / 2,
        y: display.bounds.y + display.bounds.height / 2 - size.height / 2,
        width: size.width,
        height: size.height,
    };
}

function applyZoom(size: SizeInt, zoomFactor: number): SizeInt {
    return {
        width: Math.round(size.width * zoomFactor),
        height: Math.round(size.height * zoomFactor),
    };
}
