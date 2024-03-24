import { useAtom } from "jotai";
import { optionsDialogOpenAtom } from "@/store/atoms/8-dialogs";
import * as D from "@/ui/shadcn/dialog";
import { DialogOptionsBody } from "./1-body";

export function OptionsFilesDialog() {
    const [optionsDialogOpen, setOptionsDialogOpen] = useAtom(optionsDialogOpenAtom);
    return (<>
        <D.Dialog open={optionsDialogOpen} onOpenChange={() => setOptionsDialogOpen(false)}>
            <D.DialogContent className="px-3 py-3 !w-4/5 max-w-3xl data-[state=open]:[animation-duration:200ms]" noClose>

                <DialogOptionsBody setIsOpen={setOptionsDialogOpen} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
