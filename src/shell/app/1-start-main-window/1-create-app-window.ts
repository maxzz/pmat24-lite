import { appWindow } from "./8-app-window-instance";
import { initMainWindow } from "./2-init-main-window";
import { setMainWindowListeners } from "./3-listeners-of-main-window";

export function createMainWindow(): void {
    appWindow.wnd = initMainWindow();
    setMainWindowListeners(appWindow);
}
