import { useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, fldCatItemsAtom, type SelectedItemAtom } from "@/store";
import { type CatalogItem } from "@/store/manifest";
import * as D from "@/ui/shadcn/dialog";
import { BottomButtons } from "./3-bottom-buttons";
import { Button } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { FldCatItemsGrid } from "../1-items-grid";
import { SelectedItemBody } from "../2-selected-item-props";

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

        <div className="px-4 py-3">
            <div className={classNames(subSectionClasses, "mb-1 flex items-center justify-between")}>
                <div>
                    Field catlog items
                </div>

                <Button className="mb-1 aspect-square" variant="outline" size="xs">
                    +
                </Button>
            </div>

            <FldCatItemsGrid
                className="min-h-32"
                selectedItemAtom={selectedItemAtom}
                onItemDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
            />

            <div className={subSectionClasses}>
                Selected item
            </div>
            <SelectedItemBody selectedItemAtom={selectedItemAtom} />

            <div className="my-1 text-xs font-thin">
                {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
            </div>

            <div className="pt-4 flex items-center justify-end gap-x-2">
                <BottomButtons selectedItemAtom={selectedItemAtom} />
            </div>
        </div>
    </>);
}

//TODO: show folder of the field catalog
