import { proxy } from 'valtio';
import { atomWithProxy } from 'jotai-valtio';
import { TargetPosition } from '@shared/ipc-types';

type NapiBuildState = {                         // state of Napi multistep build: icons, controls, manifest
    buildRunning: boolean;                      // content check build is runnning
    buildError: string;                         // error message if build failed
    buildFailedBody: string;                    // raw string returned from main that failed to parse
};

export const napiBuildState = proxy<NapiBuildState>({
    buildRunning: false,
    buildError: '',
    buildFailedBody: '',
});

export const napiBuildStateAtom = atomWithProxy(napiBuildState);

//

type NapiBuildProgress = {
    buildCounter: number;                       // controls detection progress
    lastProgress: number;                       // last number of build progress or 0
    getPosProgress: TargetPosition | null;      // get window position progress
};

export const napiBuildProgress = proxy<NapiBuildProgress>({
    buildCounter: 0,
    lastProgress: 0,
    getPosProgress: null,
});
