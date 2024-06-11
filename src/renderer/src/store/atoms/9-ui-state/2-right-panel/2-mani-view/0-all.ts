import { FormOpenSections, defaultFormOpenSections } from "./2-mani-open-sections";
import { ManiEditorState, defaultManiEditorState } from "./3-editor-tab";

export type MainViewSettings = {
    mani: {
        sections: FormOpenSections;
        tabs: ManiEditorState;
    };
};

export const defaultMainViewSettings: MainViewSettings = {
    mani: {
        sections: defaultFormOpenSections,
        tabs: defaultManiEditorState,
    },
};
