import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuItem } from "@/ui/shadcn";
import { doSaveAllAtom } from "@/store/atoms/4-save-reset-all";
import { allFileUsChanges } from "@/store/atoms/3-file-mani-atoms";

export function MenuItem_SaveAll() {
    const doSaveAll = useSetAtom(doSaveAllAtom);
    const hasChanges = !!useSnapshot(allFileUsChanges).size;
    return (<>
        <DropdownMenuItem onClick={doSaveAll} disabled={!hasChanges}>
            Save All
            {/* <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameCreate}</DropdownMenuShortcut> */}
        </DropdownMenuItem>
    </>);
}

//TODO: add shortcut
