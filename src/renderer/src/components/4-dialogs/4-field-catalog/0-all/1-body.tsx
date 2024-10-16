import { useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, fldCatTriggerAtom } from "@/store";
import { type CatalogItem } from "@/store/manifest";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { MiddleBody } from "../1-body/2-middle-body";

export function DialogFieldCatalogBody() {
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    const selectedItemAtom = useState(() => atom<CatalogItem | null>(null))[0];
    const selectedItem = useAtomValue(selectedItemAtom);

    return (
        <div className="min-h-56 text-xs select-none">

            <D.DialogHeader className="relative py-3 text-sm font-bold border-border border-b flex items-center">
                Field Catalog (TODO: for folder?)

                <D.DialogCloseButton
                    className="right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-muted hover:rounded-sm"
                    onClick={doCancelFldCatDialog}
                    tabIndex={-1}
                />
            </D.DialogHeader>

            <div className="px-4 py-3">
                <MiddleBody selectedItemAtom={selectedItemAtom} />
            </div>

            <div className="py-3 boreder-border border-t text-center">
                <Button variant="default" size={"sm"} onClick={doCancelFldCatDialog}>
                    Close
                </Button>
            </div>
        </div>
    );
}
