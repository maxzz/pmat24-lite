import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn";
import { rightPanelAtom } from "@/store";
import { doSaveOneAtom } from "@/store/atoms/3-file-mani-atoms/8-save-reset-one";

export function MenuItem_SaveCurrentAs() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doSaveOne = useSetAtom(doSaveOneAtom);
    
    return (<>
        <DropdownMenuItem onClick={() => fileUsAtom && doSaveOne(fileUsAtom)} disabled={!fileUsAtom}>
            Save As...
            {/* <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameCreate}</DropdownMenuShortcut> */}
        </DropdownMenuItem>
    </>);
}

//TODO: add shortcut
