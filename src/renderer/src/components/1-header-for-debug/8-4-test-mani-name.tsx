import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doManiNameDlgAtom, rightPanelAtomAtom } from "@/store";

export function TestManiName() {
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const doManiNameDlg = useSetAtom(doManiNameDlgAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doManiNameDlg(currentAtom)}>
            Name...
        </Button>
    );
}
