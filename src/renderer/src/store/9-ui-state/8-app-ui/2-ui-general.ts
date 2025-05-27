export type UiGeneralState = {  // General UI settings
    showStatusbar: boolean;     // Show status bar of the main window
    showOptOnRight: boolean;    // Show option labels on the right side of the manifest editor
    showQuickXml: boolean;      // Show quick XML button
    showWelcome: boolean;       // Show welcome screen
    showWelcomeCheck: boolean;  // Show welcome screen checkbox on welcome screen
    allowWelcome: boolean;      // Allow show welcome screen to be shown as option and checkbox showWelcomeCheck; set from debug options only
    notifyNewFile: boolean;     // Show popup notification on new file creation
};

export const defaultUiGeneralState: UiGeneralState = {
    showStatusbar: true,
    showOptOnRight: true,
    showQuickXml: false,
    showWelcome: true,
    showWelcomeCheck: false,
    allowWelcome: false,
    notifyNewFile: true,
};
