import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

export type ManiEditorState = {
    activeTab: ManiTabValue;                // 'options' | 'login' | 'cpass'
    openTestArea: boolean;                  // Is the test area open
    nToGenerate: number;                    // Number of passwords to generate
};

export const defaultManiEditorState: ManiEditorState = {
    activeTab: 'options',
    openTestArea: false,
    nToGenerate: 50,
};
