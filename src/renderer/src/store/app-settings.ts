import { ThemeMode, themeApplyMode } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { debounce, mergeConfigRecursively } from "@/utils";
import { ResizablesState, defaultResizablesState } from "./state-ui";

export type AppSettings = {
    ui: {
        theme: ThemeMode;
        resisablesState: ResizablesState;
    },
};

const defaultSettings: AppSettings = {
    ui: {
        theme: 'light',
        resisablesState: defaultResizablesState,
    },
};

const STORE_KEY = "pmat24-lite-app-settings";
const STORE_VER = 'v1';

export const appSettings = proxy<AppSettings>(initialSettings());

function initialSettings(): AppSettings {
    const savedSettings = localStorage.getItem(STORE_KEY);
    let rv = defaultSettings;
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

themeApplyMode(appSettings.ui.theme);
subscribe(appSettings, () => {
    themeApplyMode(appSettings.ui.theme);
});

const saveDebounced = debounce(() => localStorage.setItem(STORE_KEY, JSON.stringify({[STORE_VER]: appSettings})), 400);
subscribe(appSettings, saveDebounced);
