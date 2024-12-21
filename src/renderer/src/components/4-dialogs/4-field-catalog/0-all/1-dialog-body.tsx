import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFceDlgAtom, doSetInitSelectedItemAtom, type FceCtx } from "@/store";
import { DialogCloseButton } from "@/ui/shadcn/dialog";
import { BottomButtons } from "./2-bottom-buttons";
import { FieldCatalogToolbar } from "../1-toolbar";
import { FldCatItemsGrid } from "../2-items-grid";
import { RightPanelGuard } from "../3-selected-item-props";
import { SymbolFolder } from "@/ui/icons";

export function FceDialogBody({ fceCtx }: { fceCtx: FceCtx; }) {
    
    const doSetInitSelectedItem = useSetAtom(doSetInitSelectedItemAtom);
    useEffect(() => { doSetInitSelectedItem({ fceCtx }); }, []);

    return (
        <div className="grid grid-rows-[auto_1fr]">
            <Header fceCtx={fceCtx} />

            <div className="p-3 pt-0 h-full grid grid-rows-[auto_1fr]">
                <FieldCatalogToolbar className="py-1" fceCtx={fceCtx} showPropsExpand={true} />

                <div className="h-full border-border border rounded flex">
                    <FldCatItemsGrid className="flex-shrink-0" fceCtx={fceCtx} />
                    <RightPanelGuard className="1relative 1bg-blue-300/10 px-2 py-2 border-border border-l 1z-10" fceCtx={fceCtx} />
                </div>

                <div className="pl-3 font-thin">
                    <TotalItems fceCtx={fceCtx} />
                </div>

                <div className="flex items-center justify-end gap-x-2">
                    <BottomButtons fceCtx={fceCtx} />
                </div>
            </div>
        </div>
    );
}

function Header({ fceCtx }: { fceCtx: FceCtx; }) {
    const doCancelFldCatDialog = useSetAtom(doCancelFceDlgAtom);
    const fname = fceCtx.fceAtoms?.fileUs.fileCnt?.fpath; //TODO: if hasMain() then show path relative to main fc file, or none if main fc file
    return (
        <div className="relative py-2 border-border border-b flex flex-col items-center">
            <div className="text-sm font-bold">
                Field Catalog
            </div>

            <div className="opacity-50 flex items-center justify-start gap-1">
                <SymbolFolder className="size-4" />
                {fname ? fname : 'root'}
            </div>

            <DialogCloseButton
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-muted hover:rounded-sm"
                onClick={doCancelFldCatDialog}
                tabIndex={-1}
            />
        </div>
    );
}

function TotalItems({ fceCtx }: { fceCtx: FceCtx; }) {
    const totalItems = useAtomValue(fceCtx.fceAtoms.allAtom).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}

//TODO: show folder of the field catalog
//TODO: show folder as an icon in the header and show the path to the folder on hover
