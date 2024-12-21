import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { doSetInitSelectedItemAtom, type FceCtx } from "@/store";
import { FieldCatalogToolbar } from "../2-toolbar";
import { FldCatItemsGrid } from "../3-items-grid";
import { RightPanelGuard } from "../4-selected-item-props";
import { Header, TotalItems } from "./3-header";
import { BottomButtons } from "./4-bottom-buttons";

export function FceDialogMainBody({ fceCtx }: { fceCtx: FceCtx; }) {
    
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
