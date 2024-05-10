import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn";
import { rightPanelAtom } from "@/store";
import { doSaveOneAsAtom } from "@/store/atoms/3-file-mani-atoms";

export function MenuItem_SaveCurrentAs() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doSaveOne = useSetAtom(doSaveOneAsAtom);
    
    return (<>
        <DropdownMenuItem onClick={() => fileUsAtom && doSaveOne(fileUsAtom)} disabled={!fileUsAtom}>
            Save As...
            {/* <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameCreate}</DropdownMenuShortcut> */}
        </DropdownMenuItem>
    </>);
}

//TODO: add shortcut
