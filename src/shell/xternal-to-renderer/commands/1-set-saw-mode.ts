import { winApp } from '@shell/start-main-window/main-window';
import { mainStore } from '@shell/store-main';

const prevPos: { pos: number[]; size: number[] } = { // saved position and size before saw mode
    pos: [],
    size: [],
}

export function setSawMode(on: boolean): void {
    if (!winApp) {
        return;
    }

    if (on) {
        prevPos.pos  = winApp.getPosition();
        prevPos.size = winApp.getSize();
        
        winApp.setPosition(0, 0);
        winApp.setSize(300, 200);
        winApp.setAlwaysOnTop(true);

        mainStore.sawModeIsOn = true;
        return;
    } else {
        mainStore.sawModeIsOn = false;

        winApp.setAlwaysOnTop(false);

        winApp.setPosition(prevPos.pos[0], prevPos.pos[1]);
        winApp.setSize(prevPos.size[0], prevPos.size[1]);
    }
}
