import { useAtom } from "jotai";
import { doOpenFldCatDialogAtom } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { DialogFieldCatalogBody } from "./1-body";

const contentClasses = "p-0 !w-1/2 max-w-xl data-[state=open]:[animation-duration:200ms]";
const overlayClasses = "backdrop-blur-[1px] bg-background/30";

export function FieldCatalogDialog() {

    const [openFieldCatalogDialog, doOpenFieldCatalogDialog] = useAtom(doOpenFldCatDialogAtom);
    if (!openFieldCatalogDialog) {
        return null;
    }

    return (<>
        <D.Dialog open={openFieldCatalogDialog} onOpenChange={() => doOpenFieldCatalogDialog()}>
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
