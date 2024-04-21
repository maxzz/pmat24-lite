import { RightPanelState, defaultRightPanelState } from "./1-right-panel-view";
import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";

export type RightPanelOptions = {
    rightPanelState: RightPanelState;
    mainOpenSections: FormOpenSections;
};

export const defaultRightPanelOptions: RightPanelOptions = {
    rightPanelState: defaultRightPanelState,
    mainOpenSections: defaultFormOpenSections,
};
