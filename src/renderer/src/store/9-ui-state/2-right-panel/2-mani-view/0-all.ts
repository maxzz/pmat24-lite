import { FormIdx } from "@/store/manifest";
import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

//

type ManiEditorState = {
    activeTab: ManiTabValue;                // 'options' | 'login' | 'cpass'
    openTestArea: boolean;                  // Is the test area open
    nToGenerate: number;                    // Number of passwords to generate
};

const defaultManiEditorState: ManiEditorState = {
    activeTab: 'options',
    openTestArea: false,
    nToGenerate: 50,
};

//

type FormOpenSections = {
    [FormIdx.login]: string[],
    [FormIdx.cpass]: string[],
};

const defaultFormOpenSections: FormOpenSections = {
    [FormIdx.login]: [],
    [FormIdx.cpass]: [],
};

//

type FormOpenOptions = {
    [FormIdx.login]: Record<string, boolean>,
    [FormIdx.cpass]: Record<string, boolean>,
};

const defaultFormOpenOptions: FormOpenOptions = {
    [FormIdx.login]: {},
    [FormIdx.cpass]: {},
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
