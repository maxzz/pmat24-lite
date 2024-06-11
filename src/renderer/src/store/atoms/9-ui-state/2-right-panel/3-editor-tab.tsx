export type ManiEditorState = {
    currentTab: 'tab0' | 'tab1' | 'tab3';
    testAreaOpen: boolean;
};

export const defaultManiEditorState: ManiEditorState = {
    currentTab: 'tab0',
    testAreaOpen: false,
};
