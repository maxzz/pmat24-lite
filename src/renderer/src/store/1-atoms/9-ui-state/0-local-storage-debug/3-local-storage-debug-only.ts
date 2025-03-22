export type DebugOnly = {
    showCreateSrcCodeBtn: boolean; // Show button to view source code of the new manifest editor; this allows to switch between editors
    showCreateSrcCode: boolean;    // Show source code of the new manifest editor; this is current state of the editor
    debugAccess: boolean;          // Allow access to debug options
};

export const initialDebugOnly: DebugOnly = {
    showCreateSrcCodeBtn: false,
    showCreateSrcCode: false,
    debugAccess: false,
};
