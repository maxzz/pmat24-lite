import { useAtom } from "jotai";
import { doOpenCreateDialogAtom } from "@/store/1-atoms/7-dialogs";
import * as D from "@/ui/shadcn/dialog";
import { DialogCreateManiBody } from "./1-body";

export function CreateManiDialog() {
    const [openCreateDialog, doOpenCreateDialog] = useAtom(doOpenCreateDialogAtom);
    if (!openCreateDialog) {
        return null;
    }
    return (<>
        <D.Dialog open={openCreateDialog} onOpenChange={() => doOpenCreateDialog(false)}>
            <D.DialogContent
                className="p-0 !w-2/3 max-w-3xl rounded-md data-[state=open]:[animation-duration:200ms]"
                noClose
                hiddenTitle="New Manifest"
            >

                <DialogCreateManiBody setIsOpen={doOpenCreateDialog} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
