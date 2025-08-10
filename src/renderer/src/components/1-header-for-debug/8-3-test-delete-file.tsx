import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { getCpassFileUsAtom, rightPanelAtomAtom } from "@/store/1-atoms/3-right-panel";
import { doDeleteCpassFromFileUsAtom, doDeleteFileUsAtom } from "@/store/1-atoms/2-file-mani-atoms";

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
