export type UiGeneralState = {      // General UI settings
    showStatusbar: boolean;         // Show status bar of the main window
    showOptOnRight: boolean;        // Show option labels on the right side of the manifest editor
    showQuickXml: boolean;          // Show quick XML button in the right panel
    showFormTextFields: boolean;    // Show text fields in form editor. They are used for win32 extended match. In old PMAT default was false.
    showWelcome: boolean;           // Show welcome screen
    showWelcomeCheck: boolean;      // Show welcome screen checkbox on welcome screen
    allowWelcome: boolean;          // Allow show welcome screen to be shown as option and checkbox showWelcomeCheck; set from debug options only
    notifyNewFile: boolean;         // Show popup notification on new file creation
    notifyAlienfiles: boolean;      // Show popup notification on non-manifest files open
    sawPosition: number;            // Position of saw monitor on screen. 0 center, 1 top-left, 2 top-right, 3 bottom-left, 4 bottom-right
};

export const defaultUiGeneralState: UiGeneralState = {
    showStatusbar: true,
    showOptOnRight: true,
    showQuickXml: false,
    showFormTextFields: false,
    showWelcome: true,
    showWelcomeCheck: false,
    allowWelcome: false,
    notifyNewFile: true,
    notifyAlienfiles: false,
    sawPosition: 0,
};
