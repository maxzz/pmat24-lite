import { useAtomValue, useSetAtom } from "jotai";
import { rightPanelAtomAtom } from "@/store/1-atoms/3-right-panel";
import { doSaveOneAtom } from "@/store/1-atoms/2-file-mani-atoms/0-all-serve-atoms";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_SaveCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const doSaveOne = useSetAtom(doSaveOneAtom);

    return (<>
        <DropdownMenuItem onClick={() => fileUsAtom && doSaveOne({ fileUsAtom })} disabled={!fileUsAtom}>
            Save
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.saveOne.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
