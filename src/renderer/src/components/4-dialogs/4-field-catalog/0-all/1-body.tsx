import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { createFceCtx, doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, type FldCatInData, type FceCtx } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { BottomButtons } from "./3-bottom-buttons";
import { FieldCatalogToolbar } from "../1-toolbar";
import { FldCatItemsGrid } from "../2-items-grid";
import { RightPanelGuard } from "../3-selected-item-props";
import { SymbolFolder } from "@/ui/icons";

export function DialogFieldCatalogBody({ inData }: { inData: FldCatInData; }) {
    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const fceCtx = useState<FceCtx>(() => createFceCtx(inData, closeFldCatDialog))[0];
    return (
        <div className="grid grid-rows-[auto_1fr]">
            <Header fceCtx={inData} />

            <div className="px-3 pb-3 h-full grid grid-rows-[auto_1fr]">
                <FieldCatalogToolbar className="py-1" fceCtx={fceCtx} />

                <div className="h-full border-border border rounded flex">
                    <FldCatItemsGrid fceCtx={fceCtx} />
                    <RightPanelGuard className="1relative 1bg-blue-300/10 px-2 py-2 border-border border-l 1z-10" fceCtx={fceCtx} />
                </div>

                <div className="pl-3 font-thin">
                    <TotalItems fceCtx={inData} />
                </div>

                <div className="flex items-center justify-end gap-x-2">
                    <BottomButtons fceCtx={fceCtx} />
                </div>
            </div>
        </div>
    );
}

function Header({ fceCtx }: { fceCtx: FldCatInData; }) {
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);
    
    console.log('fceCtx', fceCtx);
    
    const fname = fceCtx.fceRoot?.fileCnt?.fpath;
    return (
        <div className="relative py-2 border-border border-b flex flex-col items-center">
            <div className="text-sm font-bold">
                Field Catalog
            </div>

            <div className="opacity-50 flex items-center justify-start gap-1">
                <SymbolFolder className="size-4" />
                {fname ? fname : 'root'}
            </div>

            <D.DialogCloseButton
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-muted hover:rounded-sm"
                onClick={doCancelFldCatDialog}
                tabIndex={-1}
            />
        </div>
    );
}

function TotalItems({ fceCtx }: { fceCtx: FldCatInData; }) {
    return null;

    const totalItems = useAtomValue(fceCtx.fceRoot.items).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}

//TODO: show folder of the field catalog
//TODO: show folder as an icon in the header and show the path to the folder on hover
