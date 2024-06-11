import { themeApplyMode } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { debounce, mergeConfigRecursively } from "@/utils";
import { FileListSettings, defaultFileListSettings } from "./atoms/9-ui-state/1-files-list";
import { atomWithProxy } from "jotai-valtio";
import { RightPanelSettings, defaultRightPanelSettings } from "./atoms/9-ui-state/2-right-panel";
import { AppUISettings, defaultAppUISettings } from "./atoms/9-ui-state/3-app-ui";

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

const STORE_KEY = "pmat24-lite-app-settings";
const STORE_VER = 'v1';

export const appSettings = proxy<AppSettings>(initialSettings());

function initialSettings(): AppSettings {
    let rv = defaultSettings;

    const savedSettings = localStorage.getItem(STORE_KEY);
    if (savedSettings) {
        try {
            rv = JSON.parse(savedSettings)?.[STORE_VER];
        } catch (error) {
            console.error('storage bad format');
        }
    }

    const merged = mergeConfigRecursively(defaultSettings, rv);
    return merged;
}

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

export const fileListOptionsAtom = atomWithProxy<FileListSettings>(appSettings.files);
