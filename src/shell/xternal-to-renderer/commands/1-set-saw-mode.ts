import { winApp } from '@shell/start-main-window/main-window';

const prevPos: { pos: number[]; size: number[] } = {
    pos: [],
    size: [],
}

export function setSawMode(on: boolean): void {
    if (!winApp) {
        return;
    }

    if (on) {
        const pos = winApp.getPosition();
        const size = winApp.getSize();
        prevPos.pos  = pos;
        prevPos.size = size;
    
        winApp.setAlwaysOnTop(true);
        return;
    } else {
        winApp.setPosition(prevPos.pos[0], prevPos.pos[1]);
        winApp.setSize(prevPos.size[0], prevPos.size[1]);

        winApp.setAlwaysOnTop(false);
    }
   
}
