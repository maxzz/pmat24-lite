import { useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, type FceItem, type FldCatInData, fldCatItemsAtom, type SelectedItemAtom } from "@/store";
import { type CatalogItem } from "@/store/manifest";
import * as D from "@/ui/shadcn/dialog";
import { type FceCtx } from "./9-types";
import { BottomButtons } from "./2-bottom-buttons";
import { FieldCatalogToolbar } from "../1-toolbar";
import { FldCatItemsGrid } from "../2-items-grid";
import { RightPanelGuard } from "../3-selected-item-props";

const subSectionClasses = 'text-xs text-foreground bg-background border-border border-b';

export function DialogFieldCatalogBody({ inData }: { inData: FldCatInData; }) {

    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);
    const selectedItemAtom = useState<SelectedItemAtom>(() => atom<FceItem | null>(null))[0];

    const fceCtx = useState<FceCtx>(
        () => {
            const rv: FceCtx = {
                inData,
                selectedItemAtom,
                onItemDoubleClick: (item: FceItem) => closeFldCatDialog({ fldCatItem: item }),
            };
            return rv;
        }
    )[0];

    return (
        <div className="grid grid-rows-[auto_1fr]">
            <D.DialogHeader className="relative py-3 text-sm font-bold border-border border-b flex items-center">
                Field Catalog

                <D.DialogCloseButton
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-muted hover:rounded-sm"
                    onClick={doCancelFldCatDialog}
                    tabIndex={-1}
                />
            </D.DialogHeader>

            <div className="px-3 pb-3 h-full grid grid-rows-[auto_1fr]">
                <FieldCatalogToolbar
                    className="py-1"
                    fceCtx={fceCtx}
                />

                {/* <div className="min-h-80 border-border border rounded grid grid-cols-[minmax(200px,1fr)_200px]"> */}
                <div className="h-full border-border border rounded flex">
                    <FldCatItemsGrid
                        selectedItemAtom={selectedItemAtom}
                        onItemDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
                        fceCtx={fceCtx}
                    />

                    <RightPanelGuard
                        className="1relative 1bg-blue-300/10 px-2 py-2 border-border border-l 1z-10"
                        selectedItemAtom={selectedItemAtom}
                        fceCtx={fceCtx}
                    />
                </div>

                <div className="pl-3 font-thin">
                    <TotalItems fceCtx={inData} />
                </div>

                <div className="flex items-center justify-end gap-x-2">
                    <BottomButtons
                        selectedItemAtom={selectedItemAtom}
                        fceCtx={fceCtx}
                    />
                </div>
            </div>
        </div>
    );
}

function TotalItems({ fceCtx }: { fceCtx: FldCatInData; }) {
    const totalItems = useAtomValue(fceCtx.fceRoot.items).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}

//TODO: show folder of the field catalog
