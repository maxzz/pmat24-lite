import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doVerifyNameBeforeSaveAtom, rightPanelAtom } from "@/store";

export function TestManiName() {
    const doVerifyNameBeforeSave = useSetAtom(doVerifyNameBeforeSaveAtom);
    const rightPanel = useAtomValue(rightPanelAtom);
    return (
        <Button className="text-[.65rem]" disabled={!rightPanel} onClick={() => doVerifyNameBeforeSave()}>
            Name...
        </Button>
    );
}
