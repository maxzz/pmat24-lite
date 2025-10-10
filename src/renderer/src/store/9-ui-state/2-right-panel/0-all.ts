import { FormIdx } from "@/store/manifest";
import { ManiTabValue } from "@/store/2-file-mani-atoms/9-types";

// Utilities

export function opensName(formIdx: FormIdx, name: string): string { // Name of open/closed section state
    return `${name}-${formIdx}`;
}

// 1-right-panel-view

export const enum RightPanelViewType {
    forms,  // show login / password change forms
    xml,    // show XML
}

// 2-mani-view

type ManiEditorState = {
    activeTab: ManiTabValue;                // 'options' | 'login' | 'cpass'
    opened: Record<string, boolean>;        // Is collapse item open
    openTestArea: boolean;                  // Password Policy Dialog: Is the test area open
    nToGenerate: number;                    // Password Policy Dialog: Number of passwords to generate
};

const defaultManiEditorState: ManiEditorState = {
    activeTab: 'options',
    opened: {},
    openTestArea: false,
    nToGenerate: 50,
};

//

export const defaultRightPanelSettings = {
    activeView: RightPanelViewType.forms,
    mani: { ...defaultManiEditorState },
};

export type RightPanelSettings = typeof defaultRightPanelSettings;
