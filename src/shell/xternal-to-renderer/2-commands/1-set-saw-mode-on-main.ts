import { screen, BrowserWindow } from "electron";
import { type SizeInt, type R2M, type RectangleInt } from "@shared/ipc-types";
import { mainStore } from "@shell/2-main-globals";

const defaultSize: SizeInt = { width: 350, height: 330, }; // add extra height to the client area for the Windows border and controls

let savedRect: RectangleInt = { x: 0, y: 0, ...defaultSize }; // saved position and size before saw mode
let savedTitle: string = 'PMAT';
let savedMaximized: boolean = false;

export function setSawModeOnMain(winApp: BrowserWindow | null, { setOn, size }: Omit<R2M.SetSawMode, 'type'>): void {
    if (!winApp) {
        return;
    }

    if (setOn) {
        savedRect = getWindowRect(winApp);
        savedTitle = winApp.getTitle();

        mainStore.sawModeIsOn = true;

        setWindowRect(winApp, centerRect(savedRect, applyZoom(size ? size : defaultSize, winApp.webContents.getZoomFactor())));

        if (winApp.isMaximized()) {
            savedMaximized = true;
            winApp.unmaximize();
        } else {
            savedMaximized = false;
        }

        winApp.setAlwaysOnTop(true);
        winApp.setTitle('PMAT - Select application');
    } else {
        mainStore.sawModeIsOn = false;
        winApp.setAlwaysOnTop(false);
        winApp.setTitle(savedTitle);

        if (savedMaximized) {
            winApp.maximize();
        }

        setWindowRect(winApp, savedRect);
    }
}

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
