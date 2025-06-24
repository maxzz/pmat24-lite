import { proxy } from 'valtio';
import { atomWithProxy } from 'jotai-valtio';
import { type PosTrackerCbType } from '@shared/ipc-types';

// Build state

type StateNapiAccess = {                        // State of Napi multistep build: icons, controls, manifest
    buildRunning: boolean;                      // Content check build is runnning. Make shure there is no multiple calls at the same time or use counter as lock
    buildError: string;                         // Error message if build failed
    buildFailedBody: string;                    // Raw string returned from main that failed to parse
};

export const stateNapiAccess = proxy<StateNapiAccess>({
    buildRunning: false,
    buildError: '',
    buildFailedBody: '',
});

export const stateNapiAccessAtom = atomWithProxy(stateNapiAccess);

// State of build manifest progress

type StateNapiBuildMani = {
    buildCounter: number;                       // Controls detection progress
    lastProgress: number;                       // Last number of build progress or 0
};

export const stateNapiBuildMani = proxy<StateNapiBuildMani>({
    buildCounter: 0,
    lastProgress: 0,
});

// State of napi pos tracker

type StateNapiPosTracker = {
    current: PosTrackerCbType;
    dragIsRunning: boolean;
};

export const stateNapiPosTracker = proxy<StateNapiPosTracker>({
    current: {
        x: 0,
        y: 0,
        isInside: false,
    },
    dragIsRunning: false,
});
