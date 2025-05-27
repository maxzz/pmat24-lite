import { proxy, subscribe } from "valtio";
import { atomWithProxy } from "jotai-valtio";
import { debounce, mergeConfigRecursively, themeApplyMode } from "@/utils";
import { initializeMru } from "@/store/1-atoms/1-files";
import { type FileListSettings, defaultFileListSettings } from "../1-files-list";
import { type RightPanelSettings, defaultRightPanelSettings } from "../2-right-panel";
import { type AppUISettings, defaultAppUISettings } from "../8-app-ui";

const STORE_KEY = "pmat25-ui";
const STORE_VER = 'v1';

export type AppSettings = {
    appUi: AppUISettings;           // App UI settings: theme, divider, etc.
    files: FileListSettings;        // File list settings
    right: RightPanelSettings;      // Right panel settings
};

const defaultSettings: AppSettings = {
    appUi: defaultAppUISettings,
    files: defaultFileListSettings,
    right: defaultRightPanelSettings,
};

export const appSettings = proxy<AppSettings>(initialSettings());

function initialSettings(): AppSettings {
    let storageData = defaultSettings;

    const savedSettings = localStorage.getItem(STORE_KEY);
    if (savedSettings) {
        try {
            storageData = JSON.parse(savedSettings)?.[STORE_VER];
        } catch (error) {
            console.error('bad storage:ui');
        }
    }

    const rv = mergeConfigRecursively(defaultSettings, storageData);
    return rv;
}

// MRU

function initializeAsyncSettings() {
    initializeMru();
}

initializeAsyncSettings();

// Apply theme changes

themeApplyMode(appSettings.appUi.theme);

subscribe(appSettings, () => {
    themeApplyMode(appSettings.appUi.theme);
});

// Save settings changes to localStorage

const saveDebounced = debounce(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ [STORE_VER]: appSettings }));
}, 400);

subscribe(appSettings, saveDebounced);

// Valtio state to Jotai atoms bridge

export const optionsFilesProxyAtom = atomWithProxy<FileListSettings>(appSettings.files);
export const optionsAppUiProxyAtom = atomWithProxy<AppUISettings>(appSettings.appUi);

// App title

export const defaultTitle = 'PMAT';

export const appMainTitle = proxy({
    title: '',
});

//
