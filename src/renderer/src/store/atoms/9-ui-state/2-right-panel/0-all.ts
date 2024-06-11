import { RightPanelView, defaultRightPanelView } from "./1-right-panel-view";
import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";
import { ManiEditorState, defaultManiEditorState } from "./3-editor-tab";

export type RightPanelSettings = {
    panelView: RightPanelView;
    mainOpenSections: FormOpenSections;
    maniEditorState: ManiEditorState;
};

export const defaultRightPanelSettings: RightPanelSettings = {
    panelView: defaultRightPanelView,
    mainOpenSections: defaultFormOpenSections,
    maniEditorState: defaultManiEditorState,
};
