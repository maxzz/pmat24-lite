import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { doCancelFceDlgAtom, doCloseFceDlgAtom, type FceCtx, type FceItem } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { BottomButtons } from "./2-bottom-buttons";
import { FieldCatalogToolbar } from "../1-toolbar";
import { FldCatItemsGrid } from "../2-items-grid";
import { RightPanelGuard } from "../3-selected-item-props";
import { SymbolFolder } from "@/ui/icons";

export function DialogFieldCatalogBody({ fceCtx }: { fceCtx: FceCtx; }) {

    const closeFldCatDialog = useSetAtom(doCloseFceDlgAtom);
    // fceCtx.closeFldCatDialog = closeFldCatDialog;
    
    // const fceCtx = useState<FceCtx>(() => createFceCtx(inData, closeFldCatDialog))[0];
    // if (!fceCtx.inData?.fceAtoms) {
    //     return <div className="grid place-items-center">There is no Field Catalog</div>;
    // }
    
    const itemsAtom = fceCtx.fceAtoms.itemsAtom;

    return (
        <div className="grid grid-rows-[auto_1fr]">
            <Header fceCtx={fceCtx} />

            <div className="px-3 pb-3 h-full grid grid-rows-[auto_1fr]">
                <FieldCatalogToolbar className="py-1" fceCtx={fceCtx} />

                <div className="h-full border-border border rounded flex">
                    <FldCatItemsGrid fceCtx={fceCtx} />
                    <RightPanelGuard className="1relative 1bg-blue-300/10 px-2 py-2 border-border border-l 1z-10" fceCtx={fceCtx} />
                </div>

                <div className="pl-3 font-thin">
                    <TotalItems itemsAtom={itemsAtom} />
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
    const fname = fceCtx.fceAtoms?.fileUs.fileCnt?.fpath;
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

function TotalItems({ itemsAtom }: { itemsAtom: PrimitiveAtom<FceItem[]>; }) {
    const totalItems = useAtomValue(itemsAtom).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}

//TODO: show folder of the field catalog
//TODO: show folder as an icon in the header and show the path to the folder on hover
