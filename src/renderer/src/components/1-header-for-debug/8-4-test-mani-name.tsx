import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { doManiNameDlgAtom } from "../4-dialogs/5-confirm/5-dlg-mani-name/7-exec-rename-mani-dlg";

export function TestManiName() {
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const doManiNameDlg = useSetAtom(doManiNameDlgAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doManiNameDlg({ fileUsAtom: currentAtom, provideDefaultName: false })}>
            Name...
        </Button>
    );
}
