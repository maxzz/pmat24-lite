import { proxy, subscribe } from "valtio";
import { mergeDefaultAndLoaded } from "@/utils";
import { sendNapiOptions } from "@/xternal-to-main";
import { type DebugMonitorState, initialDebugMonitorState } from "./2-local-storage-debug-monitor";
import { type TestCreate, initialTestCreate } from "../../7-napi-atoms/8-create-mani-tests-w-fetch/9-types-of-tests";
import { type DebugOnly, initialDebugOnly } from "./3-local-storage-debug-only";

const STORAGE_UI_KEY = 'pmat25:debug';
const STORAGE_UI_VER = 'v1';

type DebugState = {
    uiState: DebugMonitorState;
    testCreate: TestCreate;
    debugOnly: DebugOnly;
};

const initialDebugState: DebugState = {
    uiState: initialDebugMonitorState,
    testCreate: initialTestCreate,
    debugOnly: initialDebugOnly,
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
            console.error('bad storage:data');
        }
    }

    const rv = mergeDefaultAndLoaded({ defaults: initialDebugState, loaded: storageUi });
    return rv;
}

subscribe(debugSettings, () => {
    sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: debugSettings }));
});
