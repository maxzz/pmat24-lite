import { screen, BrowserWindow } from "electron";
import { type RectangleInt } from "@shared/ipc-types";
import { getWindowRect, setWindowRect } from "@shell/3-utils-main";
import { electronState } from "@shell/2-electron-globals";

export function setSawPositionOnMain(winApp: BrowserWindow | null, position: number): void {
    if (!winApp || !electronState.sawModeIsOn) {
        return;
    }

    const rect = getWindowRect(winApp);
    const newRect = applyPosition(rect, position);
    
    setWindowRect(winApp, newRect);
}

function applyPosition(rect: RectangleInt, position: number): RectangleInt {
    const newRect: RectangleInt = { ...rect };

    const displayWorkArea = screen.getPrimaryDisplay().workArea;

    switch (position) {
        case 0: {
            newRect.x = displayWorkArea.x;
            newRect.y = displayWorkArea.y;
            break;
        }
        case 1: {
            newRect.x = displayWorkArea.x;
            newRect.y = displayWorkArea.y;
            break;
        }
        case 2: {
            newRect.x = displayWorkArea.x + displayWorkArea.width - rect.width;
            newRect.y = displayWorkArea.y;
            break;
        }
        case 3: {
            newRect.x = displayWorkArea.x + displayWorkArea.width - rect.width;
            newRect.y = displayWorkArea.y + displayWorkArea.height - rect.height;
            break;
        }
        case 4: {
            newRect.x = displayWorkArea.x;
            newRect.y = displayWorkArea.y + displayWorkArea.height - rect.height;
            break;
        }
        default: {
            throw new Error(`\nUnknown position: ${position}\n`);
        }
    }
    return newRect;
}
