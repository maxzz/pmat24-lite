import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";
import { ManiEditorState, defaultManiEditorState } from "./3-editor-tab";

export type MainViewSettings = {
    mani: ManiEditorState & {
        openGeneral: boolean;
        openInOptions: FormOpenSections;
        openInForms: FormOpenSections;
    };
};

export const defaultMainViewSettings: MainViewSettings = {
    mani: {
        ...defaultManiEditorState,
        openGeneral: false,
        openInOptions: defaultFormOpenSections,
        openInForms: defaultFormOpenSections,
    },
};
