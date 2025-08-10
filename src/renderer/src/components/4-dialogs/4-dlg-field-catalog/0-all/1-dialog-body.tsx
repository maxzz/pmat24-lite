import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { type FceCtx, doSetInitSelectedItemAtom } from "@/store/1-atoms/4-field-catalogs";
import { Header } from "./3-header";
import { FieldCatalogToolbar } from "../2-toolbar";
import { RightPanelGuard, SelectedItemPropsBody } from "../4-selected-item-props";
import { TotalItems } from "./4-total-items";
import { FldCatItemsGrid } from "../3-items-grid";
import { BottomButtons } from "./5-bottom-buttons";

export function FceDialogBodySelector({ fceCtx }: { fceCtx: FceCtx; }) {

    const doSetInitSelectedItem = useSetAtom(doSetInitSelectedItemAtom);
    useEffect(() => { doSetInitSelectedItem({ fceCtx }); }, []);

    const openMainDlg = !fceCtx.inData?.openItemPickerDlg;

    return (<>
        {openMainDlg
            ? <FceDialogMainBody fceCtx={fceCtx} />
            : <FceDialogPickerBody fceCtx={fceCtx} />
        }
    </>);
}

const gridClasses = "\
h-full \
grid grid-rows-[1fr_auto] \
grid-cols-1 @[400px]/fc-body:grid-cols-2 \
gap-y-2 @[400px]/fc-body:gap-y-0 \
border-border border rounded";

function FceDialogMainBody({ fceCtx }: { fceCtx: FceCtx; }) {
    return (
        <div className="h-full grid grid-rows-[auto_1fr]">
            <Header fceCtx={fceCtx} />

            <div className="@container/fc-body p-3 pt-0 pb-2 h-full grid grid-rows-[auto_1fr_auto]">
                <FieldCatalogToolbar className="py-1" fceCtx={fceCtx} showPropsExpand={true} />

                <div className={gridClasses}>
                    <FldCatItemsGrid className="h-full" fceCtx={fceCtx} />

                    <div className="relative px-2 py-1 border-border border-t @[400px]/fc-body:border-t-0 @[400px]/fc-body:border-l">
                        <SelectedItemPropsBody fceCtx={fceCtx} />
                    </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-x-2">
                    <BottomButtons fceCtx={fceCtx} />
                </div>
            </div>
        </div>
    );
}

function FceDialogPickerBody({ fceCtx }: { fceCtx: FceCtx; }) {
    return (
        <div className="h-full grid grid-rows-[auto_1fr]">
            <Header fceCtx={fceCtx} />

            <div className="p-3 pt-0 pb-2 h-full grid grid-rows-[auto_1fr_auto] 1gap-3">
                <FieldCatalogToolbar className="py-1" fceCtx={fceCtx} showPropsExpand={true} />

                <div className="-mx-3 pt-1 h-full border-border 1border-b rounded flex">
                    <FldCatItemsGrid className="flex-shrink-0" fceCtx={fceCtx} />
                    {/* <RightPanelGuard className="1relative 1bg-blue-300/10 px-2 py-2 border-border border-l 1z-10" fceCtx={fceCtx} /> */}
                </div>

                {/* <div className="pl-3 font-thin">
                    <TotalItems fceCtx={fceCtx} />
                </div> */}

                <div className="pt-2 flex items-center justify-center gap-x-2">
                    <BottomButtons fceCtx={fceCtx} />
                </div>
            </div>
        </div>
    );
}
