import { useAtom } from "jotai";
import { doOpenFieldCatalogDialogAtom } from "@/store/atoms/7-dialogs";
import * as D from "@/ui/shadcn/dialog";
import { DialogFieldCatalogBody } from "./1-body";

const contentClasses = "p-0 !w-1/2 max-w-xl data-[state=open]:[animation-duration:200ms]";
const overlayClasses = "backdrop-blur-[1px] bg-background/30";

export function FieldCatalogDialog() {

    const [openFieldCatalogDialog, doOpenFieldCatalogDialog] = useAtom(doOpenFieldCatalogDialogAtom);
    if (!openFieldCatalogDialog) {
        return null;
    }

    return (<>
        <D.Dialog open={openFieldCatalogDialog} onOpenChange={() => doOpenFieldCatalogDialog(false)}>
            <D.DialogContent
                className={contentClasses}
                noClose
                hiddenTitle="Field Catalog"
                overlayClasses={overlayClasses}
            >
                <DialogFieldCatalogBody setIsOpen={doOpenFieldCatalogDialog} />
                
            </D.DialogContent>
        </D.Dialog>
    </>);
}
