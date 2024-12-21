import { useAtomValue, useSetAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { doCancelFceDlgAtom, fceDlgTriggerAtom } from "@/store";
import { FceDialogBody } from "./2-dialog-select-body";

const contentClasses = "\
p-0 \
!w-80 min-w-fit max-w-xl \
h-[70vh] min-h-[60vh] max-h-[90vh] \
text-xs \
gap-0 \
select-none \
data-[state=open]:[animation-duration:200ms]"; // temp.:  min-h-[60vh] to fit right panel height until it will be floated w/ absolute position

const overlayClasses = "backdrop-blur-[1px] bg-background/30";

export function FceDialog() {
    const doCancelFceDlg = useSetAtom(doCancelFceDlgAtom);

    const fceCtx = useAtomValue(fceDlgTriggerAtom);
    if (!fceCtx) {
        return null;
    }

    return (
        <D.Dialog open={!!fceCtx} onOpenChange={doCancelFceDlg}>
            <D.DialogContent
                className={contentClasses}
                noClose
                hiddenTitle="Field Catalog"
                overlayClasses={overlayClasses}
            //container={document.getElementById('portal')} // dialog from select portal will throw warning
            >
                <FceDialogBody fceCtx={fceCtx} />

            </D.DialogContent>
        </D.Dialog>
    );
}

//TODO: add initial selection
