import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { allFileUsChanges } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { doSaveAllAtom } from "@/store/1-atoms/0-serve-atoms";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_SaveAll() {

    const doSaveAll = useSetAtom(doSaveAllAtom);
    const hasChanges = !!useSnapshot(allFileUsChanges).size;
    
    return (<>
        <DropdownMenuItem onClick={doSaveAll} disabled={!hasChanges}>
            Save All
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.saveAll.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
