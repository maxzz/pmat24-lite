import { proxy } from 'valtio';
import { atomWithProxy } from 'jotai-valtio';
import { type TargetPosition } from '@shared/ipc-types';

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

export const nonReactiveLock = {
    locked: false,
    canceled: false, // Non-reactive detection cancellation. This is cheked by fake loaders when there is no electron.

    isNapiLocked(): boolean {
        if (this.locked) {
            console.error('Napi call lock is already locked');
            return true;
        }
        this.locked = true;
        this.canceled = false;
        return false;
    },
    unlock() {
        this.locked = false;
    },
    cancel() {
        this.canceled = true;
        //TODO: make Napi call to cancel detection
    },
};

// export function isNapiLocked(): boolean {
//     if (nonReactiveLock.locked) {
//         console.error('enterNonReactiveLock() lock is already locked');
//         return true;
//     }

//     nonReactiveLock.locked = true;
//     return false;
// }

