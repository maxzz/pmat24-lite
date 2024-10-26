import { useAtom } from "jotai";
import { fldCatTriggerAtom } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { DialogFieldCatalogBody } from "./1-body";

const contentClasses = "p-0 !w-fit min-w-56 max-w-xl min-h-64 max-h-[80vh] text-xs gap-0 select-none data-[state=open]:[animation-duration:200ms]";
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
                <DialogFieldCatalogBody />
                
            </D.DialogContent>
        </D.Dialog>
    </>);
}
