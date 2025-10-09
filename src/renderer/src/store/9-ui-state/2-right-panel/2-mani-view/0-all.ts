import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";
import { FormOpenOptions, defaultFormOpenOptions } from "./3-mani-open-options";
import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

//

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

// all settings for the main view

export type MainViewSettings = {
    mani:
    ManiEditorState
    & {
        openGeneral: boolean;
        openInOptions: FormOpenOptions;
        openInForms: FormOpenSections;
    };
};

export const defaultMainViewSettings: MainViewSettings = {
    mani: {
        ...defaultManiEditorState,
        openGeneral: false,
        openInOptions: defaultFormOpenOptions,
        openInForms: defaultFormOpenSections,
    },
};
