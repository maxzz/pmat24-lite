import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { optionsDialogOpenAtom } from "./1-options-dialog-atom";
import { createDialogOpenAtom } from "./2-create-dialog-atom";

export function AppGlobalShortcuts() {
    const setOptionsDialogOpen = useSetAtom(optionsDialogOpenAtom);
    const setCreateDialogOpen = useSetAtom(createDialogOpenAtom);

    useKey((event) => event.ctrlKey && event.key === ',', (event) => { event.preventDefault(); setOptionsDialogOpen(true); });
    useKey((event) => event.ctrlKey && event.key === 's', (event) => { event.preventDefault(); setOptionsDialogOpen(true); }); // temporary
 
    useKey((event) => event.altKey && event.key === 's', (event) => { event.preventDefault(); setCreateDialogOpen(true); }); // temporary

    return null;
}
