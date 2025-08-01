import { type BrowserWindow } from "electron";

export const appWindow = {
    get wnd() {
        return _winApp;
    },
    set wnd(value: BrowserWindow | null) {
        _winApp = value;
    }
};

let _winApp: BrowserWindow | null = null;

export type AppWindow = typeof appWindow;
