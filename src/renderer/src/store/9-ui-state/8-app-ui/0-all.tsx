import { ThemeMode } from "@/utils";
import { DividerState, defaultDividerState } from "./1-divider";
import { defaultUiGeneralState, UiGeneralState } from "./2-ui-general";
import { defaultUiAdvancedState, UiAdvancedState } from "./4-advanced";
import { MruLists, defaultMruLists } from "./5-mru-folders";

export type AppUISettings = {
    theme: ThemeMode;
    divider: DividerState;
    uiGeneral: UiGeneralState;     
    uiAdvanced: UiAdvancedState;
    mru: MruLists;   
};

export const defaultAppUISettings: AppUISettings = {
    mru: defaultMruLists, // update order to ease modify in devTools
    theme: 'light',
    divider: defaultDividerState,
    uiGeneral: defaultUiGeneralState,
    uiAdvanced: defaultUiAdvancedState,
};
