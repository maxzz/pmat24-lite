import { useAtomValue, useSetAtom } from "jotai";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { doSaveOneAtom } from "@/store/0-serve-atoms";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { menuShortcutClasses } from "@/ui/local-ui";

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
