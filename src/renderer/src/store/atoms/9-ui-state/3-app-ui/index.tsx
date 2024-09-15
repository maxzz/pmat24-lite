import { ThemeMode } from "@/utils";
import { DividerState, defaultDividerState } from "./1-divider";
import { defaultUiGeneralState, UiGeneralState } from "./2-ui-general";

export type AppUISettings = {
    theme: ThemeMode;
    divider: DividerState;
    uiGeneralState: UiGeneralState;     // General UI settings
};

export const defaultAppUISettings: AppUISettings = {
    theme: 'light',
    divider: defaultDividerState,
    uiGeneralState: defaultUiGeneralState,
};
