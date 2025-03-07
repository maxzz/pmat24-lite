import { proxy } from 'valtio';
import { atomWithProxy } from 'jotai-valtio';
import { type TargetPosition } from '@shared/ipc-types';
import { hasMain, R2MCalls } from '@/xternal-to-main';

type NapiBuildState = {                         // State of Napi multistep build: icons, controls, manifest
    buildRunning: boolean;                      // Content check build is runnning. Make shure there is no multiple calls at the same time or use counter as lock
    buildError: string;                         // Error message if build failed
    buildFailedBody: string;                    // Raw string returned from main that failed to parse
};

export const napiBuildState = proxy<NapiBuildState>({
    buildRunning: false,
    buildError: '',
    buildFailedBody: '',
});

export const napiBuildStateAtom = atomWithProxy(napiBuildState);

//

type NapiBuildProgress = {
    buildCounter: number;                       // Controls detection progress
    lastProgress: number;                       // Last number of build progress or 0
    getPosProgress: TargetPosition | null;      // Get window position progress
};

export const napiBuildProgress = proxy<NapiBuildProgress>({
    buildCounter: 0,
    lastProgress: 0,
    getPosProgress: null,
});

export const nonReactiveDetection = {
    canceled: false,
};

// Non-reactive Napi reentrancy lock

export const napiLock = {
    isLocked: false,
    canceled: false, // Non-reactive detection cancellation. This is cheked by fake loaders when there is no electron.

    locked(): boolean {
        if (this.isLocked) {
            console.error('Napi call lock is already locked');
            return true;
        }
        this.isLocked = true;
        this.canceled = false;
        return false;
    },
    unlock() {
        this.isLocked = false;
    },
    cancel() {
        this.canceled = true;
        if (hasMain()) {
            R2MCalls.cancelDetection();
        }
    },
};
