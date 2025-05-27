export const enum RightPanelViewType {
    forms,  // show login / password change forms
    xml,    // show XML
}

export type RightPanelView = {
    activeView: RightPanelViewType;
};

export const defaultRightPanelView: RightPanelView = {
    activeView: RightPanelViewType.forms,
};
