import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { rightPanelAtomAtom } from "@/store";
import { doSaveAsAtom } from "@/store/1-atoms/2-file-mani-atoms";

export function MenuItem_SaveCurrentAs() {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const doSaveOneAs = useSetAtom(doSaveAsAtom);

    return (<>
        <DropdownMenuItem onClick={() => fileUsAtom && doSaveOneAs({ fileUsAtom })} disabled={!fileUsAtom}>
            Save As...
        </DropdownMenuItem>
    </>);
}
