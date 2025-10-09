import { FormIdx } from "@/store/manifest";
import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

// types

type ManiEditorState = {
    activeTab: ManiTabValue;                // 'options' | 'login' | 'cpass'
    openTestArea: boolean;                  // Is the test area open
    nToGenerate: number;                    // Number of passwords to generate
};

type OpensAsStrBool = {
    [FormIdx.login]: Record<string, boolean>,
    [FormIdx.cpass]: Record<string, boolean>,
};

type OpensAsArray = {
    [FormIdx.login]: string[],
    [FormIdx.cpass]: string[],
};

export type MainViewSettings = {
    mani:
    ManiEditorState
    & {
        openInOptions: OpensAsStrBool;
        nunOpenInForms: OpensAsArray;
    };
};

// default values

const defaultManiEditorState: ManiEditorState = {
    activeTab: 'options',
    openTestArea: false,
    nToGenerate: 50,
};

export const defaultMainViewSettings: MainViewSettings = {
    mani: {
        ...defaultManiEditorState,
        openInOptions: {
            [FormIdx.login]: {},
            [FormIdx.cpass]: {},
        },
        nunOpenInForms: {
            [FormIdx.login]: [],
            [FormIdx.cpass]: [],
        },
    },
};
