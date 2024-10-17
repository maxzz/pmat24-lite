import { useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, fldCatItemsAtom, type SelectedItemAtom } from "@/store";
import { type CatalogItem } from "@/store/manifest";
import * as D from "@/ui/shadcn/dialog";
import { BottomButtons } from "./3-bottom-buttons";
import { FldCatItemsGrid } from "../1-items-grid";
import { SelectedItemBody } from "../2-selected-item-props";
import { FieldCatalogToolbar } from "./2-toolbar";

const subSectionClasses = 'text-xs text-foreground bg-background border-border border-b';

export function DialogFieldCatalogBody() {

    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);
    const totalItems = useAtomValue(fldCatItemsAtom).length;
    const selectedItemAtom = useState<SelectedItemAtom>(() => atom<CatalogItem | null>(null))[0];

    return (<>
        <D.DialogHeader className="relative py-3 text-sm font-bold border-border border-b flex items-center">
            Field Catalog

            <D.DialogCloseButton
                className="right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-muted hover:rounded-sm"
                onClick={doCancelFldCatDialog}
                tabIndex={-1}
            />
        </D.DialogHeader>

        <div className="px-3 pb-3">
            <FieldCatalogToolbar className="py-1 bg-red-300/10" />

            <div className="bg-green-300/10 border-border border rounded grid grid-cols-[1fr_auto]">
                <FldCatItemsGrid
                    selectedItemAtom={selectedItemAtom}
                    onItemDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
                />

                <SelectedItemBody
                    className="bg-blue-300/10 px-2 py-2 border-border border-l"
                    selectedItemAtom={selectedItemAtom}
                />
            </div>

            <div className="font-thin">
                {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
            </div>

            <div className="flex items-center justify-end gap-x-2">
                <BottomButtons selectedItemAtom={selectedItemAtom} />
            </div>
        </div>
    </>);
}

//TODO: show folder of the field catalog
