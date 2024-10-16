import { useAtom } from "jotai";
import { fldCatTriggerAtom } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { DialogFieldCatalogBody } from "./1-body";

const contentClasses = "p-0 !w-fit max-w-xl text-xs select-none data-[state=open]:[animation-duration:200ms]";
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
            >
                <DialogFieldCatalogBody />
                
            </D.DialogContent>
        </D.Dialog>
    </>);
}
