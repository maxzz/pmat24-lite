import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { doOpenOptionsDialogAtom } from "./1-options-dialog-atom";
import { doOpenCreateDialogAtom } from "./2-create-dialog-atom";

export const shortcutNameFilter = "Ctrl+D";     // Filter manifest list
export const shortcutNameCreate = "Ctrl+S";     // Create new manifest
export const shortcutNameSettings = "Ctrl+,";   // Open settings dialog

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);

    useKey((event) => event.ctrlKey && event.key === ',', (event) => { event.preventDefault(); doOpenOptionsDialog(true); });
    // useKey((event) => event.ctrlKey && event.key === 's', (event) => { event.preventDefault(); setOptionsDialogOpen(true); });  // temporary
 
    // useKey((event) => event.altKey && event.key === 's', (event) => { event.preventDefault(); setCreateDialogOpen(true); });    // temporary
    useKey((event) => event.ctrlKey && event.key === 's', (event) => { event.preventDefault(); doOpenCreateDialog(true); });    // temporary

    return null;
}
