import { appWindow } from "./0-app-window";
import { initMainWindow } from "./1-init-main-window";
import { setMainWindowListeners } from "./2-main-window-listeners";

export function createMainWindow(): void {
    appWindow.wnd = initMainWindow();
    setMainWindowListeners(appWindow);
}
