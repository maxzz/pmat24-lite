export type UiAdvancedState = {     // Advanced UI settings
    allowHandleFiles: boolean;      // Allow opening of individual files (TBD: for electron renderer only?)
    showUiHeader: boolean;          // Show application main header and test controls (with quick access buttons)

    testCreateAppsDelay: number;    // Delay before returning screenshots for testing in ms. 0 - no delay
    testCreateManiDelay: number;    // Delay before returning manifest for testing in ms. 0 - no delay
    testCreateHwndDelay: number;    // Delay before returning hwnd and icon for testing in ms. 0 - no delay
};

export const defaultCreateDelay = 1000;

export const defaultUiAdvancedState: UiAdvancedState = {
    allowHandleFiles: false,
    showUiHeader: false,

    testCreateAppsDelay: defaultCreateDelay,
    testCreateManiDelay: defaultCreateDelay,
    testCreateHwndDelay: defaultCreateDelay,
};

/*
# Allow opening of individual files

This setting allows the user to open individual files from the main menu. When disabled, the user can only open folders.
    Opening individual files blocks field catalogs support. 
    User cannot delete files (only with FS handle). 
    User cannot create new files since parent folder is unknown.
    User cannot rename files (only with FS handle). 
    User cannot move files (only with FS handle) since file can be move outside of the root folder. 
    User cannot copy files since parent folder is unknown.
*/
