import { useAtom } from "jotai";
import { createDialogOpenAtom, optionsDialogOpenAtom } from "@/store/atoms/4-dialogs";
import * as D from "@/ui/shadcn/dialog";
import { DialogCreateManiBody } from "./1-body-first-page/1-body";

export function CreateManiDialog() {
    const [createDialogOpen, setCreateDialogOpen] = useAtom(createDialogOpenAtom);
    return (<>
        <D.Dialog open={createDialogOpen} onOpenChange={() => setCreateDialogOpen(false)}>
            <D.DialogContent className="p-0 !w-2/3 max-w-3xl rounded-md data-[state=open]:[animation-duration:200ms]" noClose>

                <DialogCreateManiBody setIsOpen={setCreateDialogOpen} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
