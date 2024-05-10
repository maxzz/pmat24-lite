import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";
import { rightPanelAtom } from "@/store";
import { doSaveOneAtom } from "@/store/atoms/3-file-mani-atoms";
import { shortcutNameSave } from "@/store/atoms/7-dialogs";

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
