import { screen, BrowserWindow } from "electron";
import { type SizeInt, type R2M, type RectangleInt } from "@shared/ipc-types";
import { mainStore } from "@shell/2-main-globals";

const defaultSize: SizeInt = { width: 350, height: 330, }; // add extra height to the client area for the Windows border and controls

let savedRect: RectangleInt = { x: 0, y: 0, ...defaultSize }; // saved position and size before saw mode
let savedTitle: string = 'PMAT';

export function setSawModeOnMain(winApp: BrowserWindow | null, { setOn, size }: Omit<R2M.SetSawMode, 'type'>): void {
    if (!winApp) {
        return;
    }

    console.log(`zoomLevel:${winApp?.webContents.zoomLevel} zoomFactor:${winApp?.webContents.getZoomFactor()}, w x h:${winApp?.getBounds().width}x${winApp?.getBounds().height}`);
    /*
        zoomLevel:1.5 zoomFactor1.3145341380123985, w x h:350x330
        1-set-saw-mode-on-main.ts:15
        zoomLevel:1.5 zoomFactor1.3145341380123985, w x h:836x972
        1-set-saw-mode-on-main.ts:15
        zoomLevel:0 zoomFactor1, w x h:836x972
        1-set-saw-mode-on-main.ts:15
        zoomLevel:0 zoomFactor1, w x h:350x330
        1-set-saw-mode-on-main.ts:15
        zoomLevel:0 zoomFactor1, w x h:836x972
        1-set-saw-mode-on-main.ts:15
        zoomLevel:-1 zoomFactor0.8333333333333334, w x h:836x972
        1-set-saw-mode-on-main.ts:15
        zoomLevel:-1 zoomFactor0.8333333333333334, w x h:350x330
        1-set-saw-mode-on-main.ts:15
        zoomLevel:-1 zoomFactor0.8333333333333334, w x h:836x972    
    */

    if (setOn) {
        savedRect = getWindowRect(winApp);
        savedTitle = winApp.getTitle();

        const newSize = applyZoom(size ? size : defaultSize, winApp.webContents.getZoomFactor());

        setWindowRect(winApp, centerRect(savedRect, newSize));
        winApp.setAlwaysOnTop(true);
        winApp.setTitle('PMAT - Select application');

        mainStore.sawModeIsOn = true;
    } else {
        mainStore.sawModeIsOn = false;
        winApp.setAlwaysOnTop(false);
        winApp.setTitle(savedTitle);

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
