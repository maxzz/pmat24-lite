import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doVerifyManiNameAtom, rightPanelAtomAtom } from "@/store";

export function TestManiName() {
    const doVerifyNameBeforeSave = useSetAtom(doVerifyManiNameAtom);
    const rightPanel = useAtomValue(rightPanelAtomAtom);
    return (
        <Button className="text-[.65rem]" disabled={!rightPanel} onClick={() => rightPanel && doVerifyNameBeforeSave(rightPanel)}>
            Name...
        </Button>
    );
}
