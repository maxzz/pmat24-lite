import { RightPanelState, defaultRightPanelState } from "./1-right-panel-view";
import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";

export type RightPanelSettings = {
    rightPanelState: RightPanelState;
    mainOpenSections: FormOpenSections;
};

export const defaultRightPanelSettings: RightPanelSettings = {
    rightPanelState: defaultRightPanelState,
    mainOpenSections: defaultFormOpenSections,
};
