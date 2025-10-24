import { useAtom } from "jotai";
import { doOpenCreateDialogAtom } from "@/store/4-dialogs-atoms";
import * as D from "@/ui/shadcn/dialog";
import { DialogCreateManiBody } from "./1-body";

export function DialogCreateManiV1() {
    const [openCreateDialog, doOpenCreateDialog] = useAtom(doOpenCreateDialogAtom);
    if (!openCreateDialog) {
        return null;
    }
    return (
        <D.Dialog open={openCreateDialog} onOpenChange={() => doOpenCreateDialog(false)}>
            <D.DialogContent
                className="p-0 w-2/3! max-w-3xl rounded-md data-[state=open]:duration-ani-200"
                noClose
                hiddenTitle="New Manifest"
            >

                <DialogCreateManiBody setIsOpen={doOpenCreateDialog} />

            </D.DialogContent>
        </D.Dialog>
    );
}
