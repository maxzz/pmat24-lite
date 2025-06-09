import { BrowserWindow } from "electron";
import { getWindowRect, relocateRect, setWindowRect } from "@shell/3-utils-main";
import { electronState } from "@shell/2-electron-globals";

export function setSawPositionOnMain(winApp: BrowserWindow | null, position: number): void {
    if (!winApp || !electronState.sawModeIsOn) {
        return;
    }

    const rect = getWindowRect(winApp);
    const newRect = relocateRect(rect, { width: rect.width, height: rect.height }, position);
    
    setWindowRect(winApp, newRect);
}
