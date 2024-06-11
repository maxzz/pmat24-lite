import { RightPanelState, defaultRightPanelState } from "./1-right-panel-view";
import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";
import { ManiEditorState, defaultManiEditorState } from "./3-editor-tab";

export type RightPanelSettings = {
    rightPanelState: RightPanelState;
    mainOpenSections: FormOpenSections;
    maniEditorState: ManiEditorState;
};

export const defaultRightPanelSettings: RightPanelSettings = {
    rightPanelState: defaultRightPanelState,
    mainOpenSections: defaultFormOpenSections,
    maniEditorState: defaultManiEditorState,
};
