import { winApp } from '@shell/start-main-window/main-window';

export function setSawMode(on: boolean): void {
    if (!winApp) {
        return;
    }

    winApp.setAlwaysOnTop(on);
}
