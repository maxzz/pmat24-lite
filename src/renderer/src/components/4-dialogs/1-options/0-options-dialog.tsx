import { useAtom } from "jotai";
import { optionsDialogOpenAtom } from "@/store/atoms/4-dialogs";
import * as D from "@/ui/shadcn/dialog";
import { DialogOptionsBody } from "./1-body";

export function OptionsFilesDialog() {
    const [optionsDialogOpen, setOptionsDialogOpen] = useAtom(optionsDialogOpenAtom);
    if (!optionsDialogOpen) {
        return null;
    }
    return (<>
        <D.Dialog open={optionsDialogOpen} onOpenChange={() => setOptionsDialogOpen(false)}>
            <D.DialogContent className="p-0 !w-2/3 max-w-3xl data-[state=open]:[animation-duration:200ms]" noClose>

                <DialogOptionsBody setIsOpen={setOptionsDialogOpen} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
