export const enum RightPanelView {
    forms,  // show login / password change forms
    xml,    // show XML
}

export type RightPanelState = {
    view: RightPanelView;
};

export const defaultRightPanelState: RightPanelState = {
    view: RightPanelView.forms,
};
