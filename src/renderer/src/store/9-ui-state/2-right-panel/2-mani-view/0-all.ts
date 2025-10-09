import { FormIdx } from "@/store/manifest";
import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

// types

type ManiEditorState = {
    activeTab: ManiTabValue;                // 'options' | 'login' | 'cpass'
    openTestArea: boolean;                  // Is the test area open
    nToGenerate: number;                    // Number of passwords to generate
};

type FormOpenSections = {
    [FormIdx.login]: string[],
    [FormIdx.cpass]: string[],
};

type FormOpenOptions = {
    [FormIdx.login]: Record<string, boolean>,
    [FormIdx.cpass]: Record<string, boolean>,
};

export type MainViewSettings = {
    mani:
    ManiEditorState
    & {
        openGeneral: boolean;
        openInOptions: FormOpenOptions;
        openInForms: FormOpenSections;
    };
};

// default values

const defaultManiEditorState: ManiEditorState = {
    activeTab: 'options',
    openTestArea: false,
    nToGenerate: 50,
};

const defaultFormOpenSections: FormOpenSections = {
    [FormIdx.login]: [],
    [FormIdx.cpass]: [],
};

const defaultFormOpenOptions: FormOpenOptions = {
    [FormIdx.login]: {},
    [FormIdx.cpass]: {},
};

export const defaultMainViewSettings: MainViewSettings = {
    mani: {
        ...defaultManiEditorState,
        openGeneral: false,
        openInOptions: defaultFormOpenOptions,
        openInForms: defaultFormOpenSections,
    },
};
