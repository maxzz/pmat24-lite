import { useAtomValue, useSetAtom } from "jotai";
import { rightPanelAtom } from "@/store";
import { doSaveOneAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { shortcutNameSave } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_SaveCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doSaveOne = useSetAtom(doSaveOneAtom);

    return (<>
        <DropdownMenuItem onClick={() => fileUsAtom && doSaveOne(fileUsAtom)} disabled={!fileUsAtom}>
            Save
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSave}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}

//TODO: add shortcut Ctrl+S
