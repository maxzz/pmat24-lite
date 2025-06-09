import { type BrowserWindow, screen } from "electron";
import { type SizeInt, type RectangleInt } from "@shared/ipc-types";

export function getWindowRect(win: BrowserWindow): Electron.Rectangle {
    const pos = win.getPosition();
    const size = win.getSize();
    return { x: pos[0], y: pos[1], width: size[0], height: size[1] };
}

export function setWindowRect(win: BrowserWindow, rect: Electron.Rectangle) {
    win.setPosition(Math.round(rect.x), Math.round(rect.y));
    win.setSize(Math.round(rect.width), Math.round(rect.height));
}

export function centerRect(currentRect: RectangleInt, size: SizeInt): RectangleInt {
    const display = screen.getDisplayMatching(currentRect) || screen.getDisplayNearestPoint(currentRect);
    return {
        x: display.bounds.x + display.bounds.width / 2 - size.width / 2,
        y: display.bounds.y + display.bounds.height / 2 - size.height / 2,
        width: size.width,
        height: size.height,
    };
}

const sideOffsetX = 15;
const sideOffsetY = 45;

export function relocateRect(currentRect: RectangleInt, size: SizeInt, position: number): RectangleInt {
    const display = screen.getDisplayMatching(currentRect) || screen.getDisplayNearestPoint(currentRect);

    position = !position || position < 0 || position > 4 ? 0 : position;
    let rv: RectangleInt = { x: 0, y: 0, width: size.width, height: size.height };

    switch (position) {
        case 0: { // center
            rv.x = display.bounds.x + display.bounds.width / 2 - size.width / 2;
            rv.y = display.bounds.y + display.bounds.height / 2 - size.height / 2;
            break;
        }
        case 1: { // top-left
            rv.x = display.bounds.x + sideOffsetX;
            rv.y = display.bounds.y + sideOffsetY;
            break;
        }
        case 2: { // top-right
            rv.x = display.bounds.x + display.bounds.width - size.width - sideOffsetX;
            rv.y = display.bounds.y + sideOffsetY;
            break;
        }
        case 3: { // bottom-left
            rv.x = display.bounds.x + sideOffsetX;
            rv.y = display.bounds.y + display.bounds.height - size.height - sideOffsetY;
            break;
        }
        case 4: { // bottom-right
            rv.x = display.bounds.x + display.bounds.width - size.width - sideOffsetX;
            rv.y = display.bounds.y + display.bounds.height - size.height - sideOffsetY;
            break;
        }
        default: {
            throw new Error(`\nUnknown position: ${position}\n`);
        }
    }

    return rv;
}

export function applyZoom(size: SizeInt, zoomFactor: number): SizeInt {
    return {
        width: Math.round(size.width * zoomFactor),
        height: Math.round(size.height * zoomFactor),
    };
}

export function fixBounds(bounds?: Electron.Rectangle): Electron.Rectangle | undefined {
    if (bounds) {
        const area = screen.getDisplayMatching(bounds).workArea;
        if (isInsideRect(bounds, area)) {
            return bounds;
        }
    }
}

export function isInsideRect(bounds: Electron.Rectangle, area: Electron.Rectangle) {
    return (
        bounds.x >= area.x &&
        bounds.y >= area.y &&
        bounds.x + bounds.width <= area.x + area.width &&
        bounds.y + bounds.height <= area.y + area.height
    );
}
