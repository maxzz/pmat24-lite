import { useAtomValue, useSetAtom } from "jotai";
import { useKey } from "react-use";
import { doOpenOptionsDialogAtom } from "../1-options-dialog-atoms";
import { doOpenCreateDialogAtom } from "../2-create-dialog-atoms";
import { doSaveOneAtom } from "../../3-file-mani-atoms";
import { doSaveAllAtom } from "../../4-save-reset-all";
import { rightPanelAtom } from "../../2-right-panel";
import { filterDialogOpenAtom } from "../3-filter-dialog-atoms";

export const shortcutNameSettings /**/ = "Ctrl+,";          // Open settings dialog
export const shortcutNameFilter   /**/ = "Ctrl+F";          // Filter manifest list
export const shortcutNameCreate   /**/ = "Ctrl+N";          // Create new manifest
export const shortcutNameSave     /**/ = "Ctrl+S";          // Save current manifest
export const shortcutNameSaveAll  /**/ = "Ctrl+Shift+S";    // Save all manifests

export function AppGlobalShortcuts() {
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doSaveOne = useSetAtom(doSaveOneAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);

    const fileUsAtom = useAtomValue(rightPanelAtom);

    // Ctrl+,
    useKey((event) => event.ctrlKey && event.key === ',', (event) => {
        event.preventDefault(); doOpenOptionsDialog(true);
    });

    // Ctrl+F
    useKey((event) => event.ctrlKey && event.key === 'f', (event) => {
        event.preventDefault(); doOpenFilterDialog(true);
    });
    // Ctrl+1 // temporary for debbuging quick access
    // useKey((event) => event.ctrlKey && event.key === '1', (event) => { event.preventDefault(); doOpenOptionsDialog(true); });

    // Ctrl+Shift+C
    useKey((event) => event.ctrlKey && event.key === 'n', (event) => {
        event.preventDefault(); doOpenCreateDialog(true);
    });
    // Ctrl+2 // temporary for debbuging quick access
    // useKey((event) => event.altKey && event.key === '2', (event) => { event.preventDefault(); doOpenCreateDialog(true); });

    // Ctrl+S
    useKey((event) => event.ctrlKey && event.key === 's', (event) => {
        event.preventDefault(); fileUsAtom && doSaveOne(fileUsAtom);
    });

    // Ctrl+Shift+S
    useKey((event) => event.ctrlKey && event.shiftKey && event.key === 's', (event) => {
        event.preventDefault(); doSaveAll();
    });

    return null;
}
