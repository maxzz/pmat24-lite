import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { rightPanelAtomAtom } from "@/store/1-atoms/3-right-panel";
import { doSaveAsAtom } from "@/store/0-serve-atoms";

export function MenuItem_SaveCurrentAs() {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const doSaveOneAs = useSetAtom(doSaveAsAtom);

    return (<>
        <DropdownMenuItem onClick={() => fileUsAtom && doSaveOneAs({ fileUsAtom })} disabled={!fileUsAtom}>
            Save As...
        </DropdownMenuItem>
    </>);
}
