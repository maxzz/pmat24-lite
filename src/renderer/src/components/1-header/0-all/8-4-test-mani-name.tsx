import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doVerifyManiNameAtom, rightPanelAtomAtom } from "@/store";

export function TestManiName() {
    const doVerifyNameBeforeSave = useSetAtom(doVerifyManiNameAtom);
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doVerifyNameBeforeSave(currentAtom)}>
            Name...
        </Button>
    );
}
