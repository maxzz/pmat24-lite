import { ThemeMode } from "@/utils";
import { DividerState, defaultDividerState } from "./1-divider";
import { defaultUiGeneralState, UiGeneralState } from "./2-ui-general";
import { defaultUiAdvancedState, UiAdvancedState } from "./4-advanced";

export type AppUISettings = {
    theme: ThemeMode;
    divider: DividerState;
    uiGeneral: UiGeneralState;     
    uiAdvanced: UiAdvancedState;   
};

export const defaultAppUISettings: AppUISettings = {
    theme: 'light',
    divider: defaultDividerState,
    uiGeneral: defaultUiGeneralState,
    uiAdvanced: defaultUiAdvancedState,
};
