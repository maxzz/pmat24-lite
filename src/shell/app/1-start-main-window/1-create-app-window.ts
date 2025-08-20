import { appWindow } from "./8-app-window-instance";
import { initAppWindow } from "./2-init-app-window";
import { setMainWindowListeners } from "./3-listeners-of-main-window";

export function createAppWindow(): void {
    appWindow.wnd = initAppWindow();
    setMainWindowListeners(appWindow);
}
