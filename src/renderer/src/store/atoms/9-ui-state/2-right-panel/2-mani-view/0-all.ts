import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";
import { ManiEditorState, defaultManiEditorState } from "./3-editor-tab";

export type MainViewSettings = {
    mani: ManiEditorState & {
        sections: FormOpenSections;
    };
};

export const defaultMainViewSettings: MainViewSettings = {
    mani: {
        ...defaultManiEditorState,
        sections: defaultFormOpenSections,
    },
};
