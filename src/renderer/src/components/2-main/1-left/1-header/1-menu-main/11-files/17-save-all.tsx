import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { allFileUsChanges, doSaveAllAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { shortcutNameSaveAll } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_SaveAll() {

    const doSaveAll = useSetAtom(doSaveAllAtom);
    const hasChanges = !!useSnapshot(allFileUsChanges).size;
    
    return (<>
        <DropdownMenuItem onClick={doSaveAll} disabled={!hasChanges}>
            Save All
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSaveAll}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}

//TODO: add shortcut Ctrol+Shift+S
