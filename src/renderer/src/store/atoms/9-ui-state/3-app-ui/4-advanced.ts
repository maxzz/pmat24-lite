export type UiAdvancedState = {     // Advanced UI settings
    allowHandleFiles: boolean;      // Allow opening of individual files
};

export const defaultUiAdvancedState: UiAdvancedState = {
    allowHandleFiles: false,
};
