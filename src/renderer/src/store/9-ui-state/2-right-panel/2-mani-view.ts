import { FormIdx } from "@/store/manifest";
import { type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

// types

type ManiEditorState = {
    activeTab: ManiTabValue;                // 'options' | 'login' | 'cpass'
    openTestArea: boolean;                  // Is the test area open
    nToGenerate: number;                    // Number of passwords to generate
    opened: Record<string, boolean>;
};

export type MainViewSettings = {
    mani: ManiEditorState;
};

// default values

const defaultManiEditorState: ManiEditorState = {
    activeTab: 'options',
    openTestArea: false,
    nToGenerate: 50,
    opened: {},
};

export const defaultMainViewSettings: MainViewSettings = {
    mani: defaultManiEditorState,
};

// Utilities

export function opensName(formIdx: FormIdx, name: string): string { // Name of open/closed section state
    return `${name}-${formIdx}`;
}
