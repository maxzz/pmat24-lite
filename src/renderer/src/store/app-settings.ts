import { ThemeMode, themeApplyMode } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { debounce, mergeConfigRecursively } from "@/utils";
import { ResizablesState, defaultResizablesState } from "./state-ui";
import { FileListOptions, defaultFileListOptions } from "./atoms/9-ui-state/1-files-list";
import { atomWithProxy } from "jotai-valtio";
import { RightPanelOptions, defaultRightPanelOptions } from "./atoms/9-ui-state/2-right-panel";

export type AppSettings = {
    ui: {
        theme: ThemeMode;
        resisablesState: ResizablesState;

        fileListOptions: FileListOptions;
        rightPanelOptions: RightPanelOptions;
    },
};

const defaultSettings: AppSettings = {
    ui: {
        theme: 'light',
        resisablesState: defaultResizablesState,

        fileListOptions: defaultFileListOptions,
        rightPanelOptions: defaultRightPanelOptions,
    },
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

themeApplyMode(appSettings.ui.theme);

subscribe(appSettings, () => {
    themeApplyMode(appSettings.ui.theme);
});

// Save settings changes to localStorage

const saveDebounced = debounce(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ [STORE_VER]: appSettings }));
}, 400);

subscribe(appSettings, saveDebounced);

// Valtio state to Jotai atoms bridge

export const fileListOptionsAtom = atomWithProxy<FileListOptions>(appSettings.ui.fileListOptions);
