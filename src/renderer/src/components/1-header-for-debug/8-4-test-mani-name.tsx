import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { rightPanelAtomAtom } from "@/store/1-atoms/3-right-panel";
import { doManiNameDlgAtom } from "@/store/1-atoms/2-file-mani-atoms/0-all-serve-atoms";

export function TestManiName() {
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const doManiNameDlg = useSetAtom(doManiNameDlgAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doManiNameDlg(currentAtom)}>
            Name...
        </Button>
    );
}
