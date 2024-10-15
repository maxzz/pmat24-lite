import { useSetAtom } from "jotai";
import { fldCatTriggerAtom } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";

export function DialogFieldCatalogBody() {
    const fldCatTrigger = useSetAtom(fldCatTriggerAtom);

    function cancelDialog() {
        fldCatTrigger(null);
    }

    return (
        <div className="min-h-56 text-xs select-none">

            <D.DialogHeader className="relative text-base font-bold border-border border-b flex items-center">
                <div className="py-4">Field Catalog (TODO: for folder?)</div>
                <D.DialogCloseButton className="right-1 -top-0.5 p-4 hover:bg-muted hover:rounded-md" tabIndex={-1} onClick={cancelDialog} />
            </D.DialogHeader>

            <div className="px-4 py-4 grid grid-cols-1 gap-6">
                456
            </div>

            <div className="py-4 boreder-border border-t text-center">
                <Button variant="default" size={"sm"} onClick={cancelDialog}>
                    Close
                </Button>
            </div>
        </div>
    );
}
