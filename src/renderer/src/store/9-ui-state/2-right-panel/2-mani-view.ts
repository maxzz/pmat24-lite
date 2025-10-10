import { FormIdx } from "@/store/manifest";
import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

// types

type ManiEditorState = {
    activeTab: ManiTabValue;                // 'options' | 'login' | 'cpass'
    openTestArea: boolean;                  // Is the test area open
    nToGenerate: number;                    // Number of passwords to generate
};

export type MainViewSettings = {
    mani:
    ManiEditorState
    & {
        opened: Record<string, boolean>;
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
        opened: {},
    },
};

// Utilities

export function toggleName(formIdx: FormIdx, name: string): string { // Name of open/closed section state
    return `${name}-${formIdx}`;
}
