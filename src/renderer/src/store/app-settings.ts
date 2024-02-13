import { ThemeMode, themeApplyMode } from "@/utils/theme-apply";
import { proxy, subscribe } from "valtio";
import { mergeConfigRecursively } from "@/utils/merge-options";
import { debounce } from "@/utils";

export type AppSettings = {
    theme: ThemeMode;
};

const defaultSettings: AppSettings = {
    theme: 'light',
};

const STORE_KEY = "pmat24-lite-app-settings";

export const appSettings = proxy<AppSettings>(initialSettings());

function initialSettings(): AppSettings {
    const savedSettings = localStorage.getItem(STORE_KEY);
    let rv = defaultSettings;
    if (savedSettings) {
        try {
            rv = JSON.parse(savedSettings);
        } catch (error) {
        }
    }
    const merged = mergeConfigRecursively(defaultSettings, rv);
    return merged;
}

themeApplyMode(appSettings.theme);
subscribe(appSettings, () => {
    themeApplyMode(appSettings.theme);
});

const saveDebounced = debounce(() => localStorage.setItem(STORE_KEY, JSON.stringify(appSettings)), 400);
subscribe(appSettings, saveDebounced);
