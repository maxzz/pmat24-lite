import { appWindow } from "./8-app-window-instance";
import { initAppWindow } from "./2-init-app-window";
import { setAppWindowListeners } from "./3-listeners-of-app-window";

export function createAppWindow(): void {
    appWindow.wnd = initAppWindow();
    setAppWindowListeners(appWindow);
}
