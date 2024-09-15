import { useAtom } from "jotai";
import { doOpenOptionsDialogAtom } from "@/store/atoms/7-dialogs";
import * as D from "@/ui/shadcn/dialog";
import { DialogOptionsBody } from "./1-body";

const contentClasses = "p-0 !w-1/2 max-w-xl data-[state=open]:[animation-duration:200ms]";
const overlayClasses = "backdrop-blur-[1px] bg-background/30";

export function OptionsFilesDialog() {

    const [optionsDialogOpen, doOpenOptionsDialog] = useAtom(doOpenOptionsDialogAtom);
    if (!optionsDialogOpen) {
        return null;
    }

    return (<>
        <D.Dialog open={optionsDialogOpen} onOpenChange={() => doOpenOptionsDialog(false)}>
            <D.DialogContent className={contentClasses} noClose hiddenTitle="Options" overlayClasses={overlayClasses}>

                <DialogOptionsBody setIsOpen={doOpenOptionsDialog} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
