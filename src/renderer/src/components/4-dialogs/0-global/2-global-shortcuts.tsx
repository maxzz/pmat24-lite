import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { isRootDirEmpty } from "@/store";
import { debugSettings } from "@/store/1-atoms/9-ui-state";
import { doSaveRightPanelFileAtom, doSaveAllAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { doOpenOptionsDialogAtom, doOpenSawOverlayForLoginAtom, filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";

export const shortcutNameSettings /**/ = "Ctrl+,";          // Open settings dialog
export const shortcutNameFilter   /**/ = "Ctrl+F";          // Filter manifest list
export const shortcutNameCreate   /**/ = "Ctrl+N";          // Create new manifest
export const shortcutNameSave     /**/ = "Ctrl+S";          // Save current manifest
export const shortcutNameSaveAll  /**/ = "Alt+S";           // Save all manifests; Ctrl+Shift+S is already taken by Edge browser

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpenCreateDialog = useSetAtom(doOpenSawOverlayForLoginAtom);
    const doSaveOneIfNotNull = useSetAtom(doSaveRightPanelFileAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);

    // Ctrl+,
    useKey((event) => event.ctrlKey && event.key === ',', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doOpenOptionsDialog(true);
        }
    });

    // Ctrl+F
    useKey((event) => event.ctrlKey && event.key === 'f', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doOpenFilterDialog(true);
        }
    });

    // Atl+N note: Ctrl ans Shift are taken by the browser
    useKey((event) => event.altKey && event.key === 'n', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doOpenCreateDialog(true);
        }
    });

    // Ctrl+S
    useKey((event) => event.ctrlKey && event.key === 's', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doSaveOneIfNotNull();
        }
    });

    // Alt+S
    useKey((event) => event.altKey && event.key === 's', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doSaveAll();
        }
    });

    // Ctrl+Alt+Shift+D
    useKey((event) => event.ctrlKey && event.altKey && event.key === 'D', (event) => {
        if (!isRootDirEmpty()) { //TODO: this should be dialog options open
            event.preventDefault(); debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;
        }
    });

    // Ctrl+1 // temporary for debbuging quick access
    // useKey((event) => event.altKey && event.key === '2', (event) => { event.preventDefault(); doOpenCreateDialog(true); });

    return null;
}
