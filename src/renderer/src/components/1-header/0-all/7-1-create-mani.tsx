import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenCreateDialogAtom } from "@/store/atoms/7-dialogs";

export function TestCreateManifest() {
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenCreateDialog(true)}>
            Create mani
        </Button>
    );
}
