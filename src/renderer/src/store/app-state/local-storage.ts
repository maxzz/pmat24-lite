import { proxy, subscribe } from 'valtio';
import { initializeUiState } from './local-storage-utils';
import { mergeDefaultAndLoaded } from '@/utils';
import { sendClientOptions } from '..';

const STORAGE_UI_KEY = 'electron-window-monitor:ui';
const STORAGE_UI_VER = 'v1';

export type UiState = {
    darkMode: boolean;
    maxControls: number;        // max # of controls before detection canceled. 0 is unlimited
    acquireXml: boolean;
    iconAutoUpdate: boolean;    // get window icon automatically
    iconsLarge: boolean;        // show large icon of the target window
};

type AppUi = {
    uiState: UiState;
};

const initialAppUi: AppUi = {
    uiState: {
        darkMode: false,
        maxControls: 0,
        acquireXml: false,
        iconAutoUpdate: true,
        iconsLarge: false,
    },
};

export const appUi = proxy<AppUi>(loadUiInitialState());

initializeUiState(appUi.uiState);

// Local storage

function loadUiInitialState(): AppUi {
    let storageUi;
    let storageUiStr = localStorage.getItem(STORAGE_UI_KEY);
    if (storageUiStr) {
        try {
            storageUi = JSON.parse(storageUiStr)?.[STORAGE_UI_VER];
        } catch (error) {
            console.error('storageUi bad format');
        }
    }

    const readyUiState = mergeDefaultAndLoaded({ defaults: initialAppUi.uiState, loaded: storageUi });

    const ready: AppUi = {
        uiState: readyUiState,
    };

    return ready;
}

subscribe(appUi.uiState, () => {
    //console.log('store ui  ', appUi.uiState);

    sendClientOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: appUi.uiState }));
});
