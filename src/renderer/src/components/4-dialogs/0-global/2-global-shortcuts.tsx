import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { doSaveRightPanelFileAtom, doSaveAllAtom } from "@/store/1-atoms/3-file-mani-atoms";
import { doOpenCreateDialogAtom, doOpenOptionsDialogAtom, filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";
import { debugSettings } from "@/store";

export const shortcutNameSettings /**/ = "Ctrl+,";          // Open settings dialog
export const shortcutNameFilter   /**/ = "Ctrl+F";          // Filter manifest list
export const shortcutNameCreate   /**/ = "Ctrl+N";          // Create new manifest
export const shortcutNameSave     /**/ = "Ctrl+S";          // Save current manifest
export const shortcutNameSaveAll  /**/ = "Alt+S";           // Save all manifests; Ctrl+Shift+S is already taken by Edge browser

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doSaveOneIfNotNull = useSetAtom(doSaveRightPanelFileAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);

    // Ctrl+,
    useKey((event) => event.ctrlKey && event.key === ',', (event) => {
        event.preventDefault(); doOpenOptionsDialog(true);
    });

    // Ctrl+F
    useKey((event) => event.ctrlKey && event.key === 'f', (event) => {
        event.preventDefault(); doOpenFilterDialog(true);
    });

    // Ctrl+N
    useKey((event) => event.ctrlKey && event.key === 'n', (event) => {
        event.preventDefault(); doOpenCreateDialog(true);
    });

    // Ctrl+S
    useKey((event) => event.ctrlKey && event.key === 's', (event) => {
        event.preventDefault(); doSaveOneIfNotNull();
    });

    // Alt+S
    useKey((event) => event.altKey && event.key === 's', (event) => {
        event.preventDefault(); doSaveAll();
    });

    // Ctrl+Alt+Shift+D
    useKey((event) => event.ctrlKey && event.altKey && event.key === 'D', (event) => {
        event.preventDefault(); debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;
    });

    // Ctrl+1 // temporary for debbuging quick access
    // useKey((event) => event.altKey && event.key === '2', (event) => { event.preventDefault(); doOpenCreateDialog(true); });

    return null;
}
