import { proxy, subscribe } from 'valtio';
import { sendNapiOptions } from '@/xternal-to-main';
import { mergeDefaultAndLoaded } from '@/utils';
import { DebugMonitorState, initialDebugMonitorState } from './state-debug-monitor';

const STORAGE_UI_KEY = 'electron-window-monitor-old:ui';
const STORAGE_UI_VER = 'v1';

type DebugState = {
    uiState: DebugMonitorState;
};

const initialDebugState: DebugState = {
    uiState: initialDebugMonitorState,
};

export const debugState = proxy<DebugState>(loadUiInitialState());

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

    const readyUiState = mergeDefaultAndLoaded({ defaults: initialDebugState.uiState, loaded: storageUi });

    const ready: DebugState = {
        uiState: readyUiState,
    };

    return ready;
}

subscribe(debugState.uiState, () => {
    //console.log('store ui  ', appUi.uiState);

    sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: debugState.uiState }));
});
