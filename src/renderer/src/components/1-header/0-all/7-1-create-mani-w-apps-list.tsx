import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenCreateDialogAtom } from "@/store/1-atoms/7-dialogs";

export function TestCreateManiWithAppsList() {
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenCreateDialog(true)}>
            Create w/ apps list...
        </Button>
    );
}
