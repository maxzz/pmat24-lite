export type ManiEditorState = {
    activeTab: string;      // 'tab0' | 'tab1' | 'tab3'
    openTestArea: boolean;  // Is the test area open
    nToGenerate: number;    // Number of passwords to generate
};

export const defaultManiEditorState: ManiEditorState = {
    activeTab: 'options',
    openTestArea: false,
    nToGenerate: 50,
};
