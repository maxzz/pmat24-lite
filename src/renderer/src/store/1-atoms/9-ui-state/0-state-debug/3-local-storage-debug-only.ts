export type DebugOnly = {
    showCreateSrcCodeBtn: boolean; // show button to view source code of the new manifest editor; this allows to switch between editors
    showCreateSrcCode: boolean;    // show source code of the new manifest editor; this is current state of the editor
};

export const initialDebugOnly: DebugOnly = {
    showCreateSrcCodeBtn: false,
    showCreateSrcCode: false,
};
