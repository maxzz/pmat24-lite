import { screen, BrowserWindow } from 'electron';
import { type R2M, type RectangleInt } from '@shared/ipc-types';
import { mainStore } from '@shell/2-main-globals';

const defaultRect: RectangleInt = { x: 0, y: 0, width: 350, height: 330, }; // add extra height to the client area for the Windows border and controls

let savedPos: RectangleInt = { ...defaultRect }; // saved position and size before saw mode
let savedTitle: string = 'PMAT';

export function setSawModeOnMain(winApp: BrowserWindow | null, { setOn, rect }: Omit<R2M.SetSawMode, 'type'>): void {
    if (!winApp) {
        return;
    }

    if (setOn) {
        savedPos = getWindowRect(winApp);
        savedTitle = winApp.getTitle();
        
        setWindowRect(winApp, centerRect(savedPos, rect || defaultRect));
        winApp.setAlwaysOnTop(true);
        winApp.setTitle('PMAT - Select application');

        mainStore.sawModeIsOn = true;
    } else {
        mainStore.sawModeIsOn = false;
        winApp.setAlwaysOnTop(false);
        winApp.setTitle(savedTitle);

        setWindowRect(winApp, savedPos);
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

function centerRect(currentRect: RectangleInt, rect: RectangleInt): RectangleInt {
    const display = screen.getDisplayMatching(currentRect) || screen.getDisplayNearestPoint(currentRect);
    return {
        x: display.bounds.x + display.bounds.width / 2 - rect.width / 2,
        y: display.bounds.y + display.bounds.height / 2 - rect.height / 2,
        width: rect.width,
        height: rect.height,
    };
}
