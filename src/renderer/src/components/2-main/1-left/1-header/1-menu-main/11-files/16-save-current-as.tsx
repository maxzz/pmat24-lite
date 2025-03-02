import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { rightPanelAtom } from "@/store";
import { doSaveOneAsAtom } from "@/store/1-atoms/3-file-mani-atoms";

export function MenuItem_SaveCurrentAs() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doSaveOneAs = useSetAtom(doSaveOneAsAtom);
    
    return (<>
        <DropdownMenuItem onClick={() => fileUsAtom && doSaveOneAs(fileUsAtom)} disabled={!fileUsAtom}>
            Save As...
        </DropdownMenuItem>
    </>);
}
