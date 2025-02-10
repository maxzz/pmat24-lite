import { proxy, subscribe } from 'valtio';
import { sendNapiOptions } from '@/xternal-to-main';
import { mergeDefaultAndLoaded } from '@/utils';
import { type DebugMonitorState, initialDebugMonitorState } from './2-local-storage-debug-monitor';
import { type TestCreate, initialTestCreate } from './3-local-storage-debug-create';

const STORAGE_UI_KEY = 'pmat24-lite:ui';
const STORAGE_UI_VER = 'v1';

type DebugState = {
    uiState: DebugMonitorState;
    testCreate: TestCreate;
};

const initialDebugState: DebugState = {
    uiState: initialDebugMonitorState,
    testCreate: initialTestCreate,
};

export const debugSettings = proxy<DebugState>(loadUiInitialState());

// Local storage is separate from the main app settings

function loadUiInitialState(): DebugState {
    let storageUi: any;
    let storageUiStr = localStorage.getItem(STORAGE_UI_KEY);
    if (storageUiStr) {
        try {
            storageUi = JSON.parse(storageUiStr)?.[STORAGE_UI_VER];
        } catch (error) {
            console.error('storageUi bad format');
        }
    }

    const state = mergeDefaultAndLoaded({ defaults: initialDebugState, loaded: storageUi });
    return state;
}

subscribe(debugSettings, () => {
    // console.log('store ui  ', JSON.stringify(debugSettings, null, 2));

    sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: debugSettings }));
});
