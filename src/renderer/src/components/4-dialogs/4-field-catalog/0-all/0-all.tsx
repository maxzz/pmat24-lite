import { useAtom } from "jotai";
import { type Fce0DlgIn, fldCatTriggerAtom } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { DialogFieldCatalogBody } from "./1-dialog-body";

const contentClasses = "p-0 !w-80 min-w-fit max-w-xl min-h-[60vh] h-[70vh] max-h-[90vh] text-xs gap-0 select-none data-[state=open]:[animation-duration:200ms]"; // temp.:  min-h-[60vh] to fit right panel hieght until it will be floated w/ absolute position
const overlayClasses = "backdrop-blur-[1px] bg-background/30";

export function FieldCatalogDialog() {

    const [fldCatTrigger, doFldCatTrigger] = useAtom(fldCatTriggerAtom);
    if (!fldCatTrigger) {
        return null;
    }

    return (<>
        <D.Dialog open={!!fldCatTrigger} onOpenChange={() => doFldCatTrigger(null)}>
            <D.DialogContent
                className={contentClasses}
                noClose
                hiddenTitle="Field Catalog"
                overlayClasses={overlayClasses}
                container={document.getElementById('portal')}
            >
                <DialogFieldCatalogBody inData={fldCatTrigger} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
