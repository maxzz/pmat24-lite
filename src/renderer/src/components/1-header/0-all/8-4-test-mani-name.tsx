import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doManiNameDlgAtom, rightPanelAtomAtom } from "@/store";

export function TestManiName() {
    const doManiNameDlg = useSetAtom(doManiNameDlgAtom);
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doManiNameDlg(currentAtom)}>
            Name...
        </Button>
    );
}
