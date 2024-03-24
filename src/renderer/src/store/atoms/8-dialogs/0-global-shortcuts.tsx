import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { optionsDialogOpenAtom } from "./2-options-dialog-atom";

export function AppGlobalShortcuts() {
    const setOptionsDialogOpen = useSetAtom(optionsDialogOpenAtom);

    useKey((event) => event.ctrlKey && event.key === ',', (event) => { event.preventDefault(); setOptionsDialogOpen(true); });
    useKey((event) => event.ctrlKey && event.key === 's', (event) => { event.preventDefault(); setOptionsDialogOpen(true); }); // temporary

    return null;
}
