import { TargetPosition } from '@shared/ipc-types';
import { atomWithProxy } from 'jotai-valtio';
import { proxy } from 'valtio';

type ManiBuildState = {
    buildRunning: boolean;                      // content check build is runnning
    buildError: string;                         // error message if build failed
    buildFailedBody: string;                    // raw string returned from main that failed to parse
};

export const maniBuildState = proxy<ManiBuildState>({
    buildRunning: false,
    buildError: '',
    buildFailedBody: '',
});

export const maniBuildStateAtom = atomWithProxy(maniBuildState);

//

type BuildProgressState = {
    buildCounter: number;                       // controls detection progress
    getPosProgress: TargetPosition | null;      // get window position progress
};

export const buildProgressState = proxy<BuildProgressState>({
    buildCounter: 0,
    getPosProgress: null,
});
