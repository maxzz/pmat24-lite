import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";
import { FormOpenOptions, defaultFormOpenOptions } from "./3-mani-open-options";
import { ManiEditorState, defaultManiEditorState } from "./4-editor-tab";

export type MainViewSettings = {
    mani: ManiEditorState & {
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
