import { UISize } from "@/store/store-types";

export type UiGeneralState = {
    showStatusbar: boolean;     // Show status bar of the main window
    showOptOnRight: boolean;    // Show option labels on the right side of the manifest editor
    showWelcome: boolean;       // Show welcome screen
    showQuickXml: boolean;      // Show quick XML button
};

export const defaultUiGeneralState: UiGeneralState = {
    showStatusbar: true,
    showOptOnRight: true,
    showWelcome: true,
    showQuickXml: false,
};
