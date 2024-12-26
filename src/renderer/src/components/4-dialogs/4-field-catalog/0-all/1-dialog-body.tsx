import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { doSetInitSelectedItemAtom, type FceCtx } from "@/store";
import { FieldCatalogToolbar } from "../2-toolbar";
import { FldCatItemsGrid } from "../3-items-grid";
import { RightPanelGuard, SelectedItemPropsBody } from "../4-selected-item-props";
import { Header, TotalItems } from "./3-header";
import { BottomButtons } from "./4-bottom-buttons";

export function FceDialogBodySelector({ fceCtx }: { fceCtx: FceCtx; }) {

    const doSetInitSelectedItem = useSetAtom(doSetInitSelectedItemAtom);
    useEffect(() => { doSetInitSelectedItem({ fceCtx }); }, []);

    const openMainDlg = !fceCtx.inData?.openSelectItemDlg;

    return (<>
        {openMainDlg
            ? <FceDialogMainBody fceCtx={fceCtx} />
            : <FceDialogSelectBody fceCtx={fceCtx} />
        }
    </>);
}

const itemsClasses = "h-full border-border border rounded grid grid-rows-[1fr_auto] \
grid-cols-1 \
@[400px]/fc-body:grid-cols-2 \
@[400px]/fc-body:gap-y-0 \
gap-y-2";

function FceDialogMainBody({ fceCtx }: { fceCtx: FceCtx; }) {
    return (
        <div className="grid grid-rows-[auto_1fr]">
            <Header fceCtx={fceCtx} />

            <div className="@container/fc-body p-3 pt-0 h-full grid grid-rows-[auto_1fr_auto]">
                <FieldCatalogToolbar className="py-1" fceCtx={fceCtx} showPropsExpand={true} />

                <div className={itemsClasses}>
                    <FldCatItemsGrid className="h-full" fceCtx={fceCtx} />

                    <div className="relative px-2 py-1 border-border border-t @[400px]/fc-body:border-t-0 @[400px]/fc-body:border-l">
                        <SelectedItemPropsBody fceCtx={fceCtx} />
                    </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-x-2">
                    <BottomButtons fceCtx={fceCtx} />
                </div>
            </div>
        </div>
    );
}

function FceDialogSelectBody({ fceCtx }: { fceCtx: FceCtx; }) {
    return (
        <div className="grid grid-rows-[auto_1fr]">
            <Header fceCtx={fceCtx} />

            <div className="p-3 pt-0 h-full grid grid-rows-[auto_1fr] gap-3">
                <FieldCatalogToolbar className="py-1" fceCtx={fceCtx} showPropsExpand={true} />

                <div className="-mx-3 pb-3 h-full border-border border-b rounded flex">
                    <FldCatItemsGrid className="flex-shrink-0" fceCtx={fceCtx} />
                    <RightPanelGuard className="1relative 1bg-blue-300/10 px-2 py-2 border-border border-l 1z-10" fceCtx={fceCtx} />
                </div>

                {/* <div className="pl-3 font-thin">
                    <TotalItems fceCtx={fceCtx} />
                </div> */}

                <div className="flex items-center justify-end gap-x-2">
                    <BottomButtons fceCtx={fceCtx} />
                </div>
            </div>
        </div>
    );
}
