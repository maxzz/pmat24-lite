import { UISize } from "@/store/store-types";

export type UiGeneralState = {
    showStatusbar: boolean;     // Show status bar of the main window
};

export const defaultUiGeneralState: UiGeneralState = {
    showStatusbar: true,
};
