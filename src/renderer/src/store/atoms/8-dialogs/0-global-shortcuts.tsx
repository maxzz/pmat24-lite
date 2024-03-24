import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { optionsDialogOpenAtom } from "./1-options-dialog";

export function AppGlobalShortcuts() {
    const setOptionsDialogOpen = useSetAtom(optionsDialogOpenAtom);

    useKey((event) => event.ctrlKey && event.key === ',', (event) => {
        console.log("setOptionsDialogOpen(true)");
        event.preventDefault(); setOptionsDialogOpen(true);
    });

    return null;
}
