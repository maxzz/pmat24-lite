import { useAtomValue, useSetAtom } from "jotai";
import { doRevealInExplorerAtom, rightPanelAtom } from "@/store";
import { shortcutNameSave } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_RevealInExplorerCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);

    return (
        <DropdownMenuItem onClick={() => fileUsAtom && doRevealInExplorer(fileUsAtom)} disabled={!fileUsAtom}>
            Reveal in File Explorer
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSave}</DropdownMenuShortcut>
        </DropdownMenuItem>
    );
}

//TODO: add shortcut Ctrl+S
