export const enum RightPanelViewType {
    forms,  // show login / password change forms
    xml,    // show XML
}

export type RightPanelView = {
    view: RightPanelViewType;
};

export const defaultRightPanelView: RightPanelView = {
    view: RightPanelViewType.forms,
};
