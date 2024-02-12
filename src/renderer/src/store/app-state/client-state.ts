import { TargetPosition } from '@electron/napi-calls';
import { atomWithProxy } from 'jotai-valtio';
import { proxy } from 'valtio';

type ClientState = {
    buildRunning: boolean;                      // content check build is runnning
    buildError: string;                         // error message if build failed
    buildFailedBody: string;                    // raw string returned from main that failed to parse
};

export const clientState = proxy<ClientState>({
    buildRunning: false,
    buildError: '',
    buildFailedBody: '',
});

export const clientStateAtom = atomWithProxy(clientState);

//

type BuildState = {
    buildCounter: number;                       // controls detection progress
    getPosProgress: TargetPosition | null;    // get window position progress
};

export const buildState = proxy<BuildState>({
    buildCounter: 0,
    getPosProgress: null,
});
