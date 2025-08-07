import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doDeleteCpassFromFileUsAtom, doDeleteFileUsAtom, getCpassFileUsAtom, rightPanelAtomAtom } from "@/store";

export function TestDeleteFile() {
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doDeleteFileUs(currentAtom)}>
            Delete...
        </Button>
    );
}

export function TestDeleteCpass() {
    const currentAtomWithCpass = useAtomValue(getCpassFileUsAtom);
    const doDeleteCpassFromFileUs = useSetAtom(doDeleteCpassFromFileUsAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtomWithCpass} onClick={() => currentAtomWithCpass && doDeleteCpassFromFileUs(currentAtomWithCpass)}>
            Delete cpass...
        </Button>
    );
}
