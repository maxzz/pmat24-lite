import { useAtom } from "jotai";
import { doOpenOptionsDialogAtom } from "@/store/atoms/4-dialogs";
import * as D from "@/ui/shadcn/dialog";
import { DialogOptionsBody } from "./1-body";

export function OptionsFilesDialog() {
    const [optionsDialogOpen, doOpenOptionsDialog] = useAtom(doOpenOptionsDialogAtom);
    if (!optionsDialogOpen) {
        return null;
    }
    return (<>
        <D.Dialog open={optionsDialogOpen} onOpenChange={() => doOpenOptionsDialog(false)}>
            <D.DialogContent className="p-0 !w-2/3 max-w-3xl data-[state=open]:[animation-duration:200ms]" noClose>

                <DialogOptionsBody setIsOpen={doOpenOptionsDialog} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
