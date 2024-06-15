export type ManiEditorState = {
    activeTab: string;      // 'tab0' | 'tab1' | 'tab3'
    testAreaOpen: boolean;  // Is the test area open
    nToGenerate: number;    // Number of passwords to generate
};

export const defaultManiEditorState: ManiEditorState = {
    activeTab: 'tab0',
    testAreaOpen: false,
    nToGenerate: 50,
};
