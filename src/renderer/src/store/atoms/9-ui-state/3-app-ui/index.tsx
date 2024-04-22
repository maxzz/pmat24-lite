import { ThemeMode } from "@/utils";
import { DividerState, defaultDividerState } from "./1-divider";

export type AppUISettings = {
    theme: ThemeMode;
    divider: DividerState;
};

export const defaultAppUISettings: AppUISettings = {
    theme: 'light',
    divider: defaultDividerState,
};
