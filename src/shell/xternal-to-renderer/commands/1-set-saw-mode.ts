import { winApp } from '@shell/start-main-window/main-window';
import { mainStore } from '@shell/store-main';

const prevPos: { pos: number[]; size: number[]; } = { // saved position and size before saw mode
    pos: [0, 0],
    size: [100, 300],
};

export function setSawMode(on: boolean): void {
    if (!winApp) {
        return;
    }

    console.log('setSawMode:', on);


    if (on) {
        prevPos.pos = winApp.getPosition();
        prevPos.size = winApp.getSize();

        console.log('setSawMode on prevPos:', prevPos);

        winApp.setPosition(0, 0);
        winApp.setSize(300, 200);
        winApp.setAlwaysOnTop(true);

        mainStore.sawModeIsOn = true;
        return;
    } else {
        mainStore.sawModeIsOn = false;

        console.log('setSawMode off prevPos:', prevPos);

        winApp.setAlwaysOnTop(false);

        winApp.setPosition(prevPos.pos[0], prevPos.pos[1]);
        winApp.setSize(prevPos.size[0], prevPos.size[1]);
    }
}
