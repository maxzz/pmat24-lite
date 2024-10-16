import { useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, fldCatItemsAtom, fldCatTriggerAtom, type SelectedItemAtom } from "@/store";
import { type CatalogItem } from "@/store/manifest";
import * as D from "@/ui/shadcn/dialog";
import { BottomButtons } from "./3-bottom-buttons";
import { Button } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { SelectedItemBody } from "../2-selected-item-props";
import { FldCatItemsGrid } from "../1-items-grid";

export function DialogFieldCatalogBody() {
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);

    const selectedItemAtom = useState<SelectedItemAtom>(() => atom<CatalogItem | null>(null))[0];
    const selectedItem = useAtomValue(selectedItemAtom);



    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const totalItems = useAtomValue(fldCatItemsAtom).length;

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    return (
        <div className="min-h-56 text-xs select-none">

            <D.DialogHeader className="relative py-3 text-sm font-bold border-border border-b flex items-center">
                Field Catalog

                <D.DialogCloseButton
                    className="right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-muted hover:rounded-sm"
                    onClick={doCancelFldCatDialog}
                    tabIndex={-1}
                />
            </D.DialogHeader>

            <div className="px-4 py-3">
                <TitleItems />
                <div className="h-[50vh] min-h-[120px]">
                    <FldCatItemsGrid
                        selectedItemAtom={selectedItemAtom}
                        onDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
                    />
                </div>

                <TitleProps />
                <SelectedItemBody selectedItemAtom={selectedItemAtom} />

                <div className={dlgHeaderClasses}>
                    {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
                </div>


                <BottomButtons selectedItemAtom={selectedItemAtom} />
            </div>
        </div>
    );
}

const subSectionClasses = 'text-sm text-foreground bg-background border-border border-b';

function TitleItems() {
    return (
        <div className={classNames(subSectionClasses, "mb-1 flex items-center justify-between")}>
            <div>
                Catlog items
            </div>

            <Button className="mb-1 aspect-square" variant="outline" size="xs">
                +
            </Button>
        </div>
    );
}



function TitleProps() {
    return (
        <div className={subSectionClasses}>
            Selected item
        </div>
    );
}


const dlgHeaderClasses = 'my-1 text-xs font-thin';

//TODO: show folder of the field catalog

