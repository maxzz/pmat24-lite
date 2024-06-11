export type ManiEditorState = {
    activeTab: string; // 'tab0' | 'tab1' | 'tab3'
    testAreaOpen: boolean;
};

export const defaultManiEditorState: ManiEditorState = {
    activeTab: 'tab0',
    testAreaOpen: false,
};
