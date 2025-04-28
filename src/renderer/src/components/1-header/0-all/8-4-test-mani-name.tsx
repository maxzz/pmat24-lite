import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenManiNameDialogAtom, fileUsOfRightPanelAtom, rightPanelAtom } from "@/store";

export function TestManiName() {
    const doOpenManiNameDialog = useSetAtom(doOpenManiNameDialogAtom);
    const rightPanel = useAtomValue(rightPanelAtom);
    return (
        <Button className="text-[.65rem]" disabled={!rightPanel} onClick={() => doOpenManiNameDialog(true)}>
            Name...
        </Button>
    );
}
