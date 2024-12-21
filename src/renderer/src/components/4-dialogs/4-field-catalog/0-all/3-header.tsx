import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx, doCancelFceDlgAtom } from "@/store";
import { DialogCloseButton } from "@/ui/shadcn/dialog";
import { SymbolFolder } from "@/ui/icons";

export function Header({ fceCtx }: { fceCtx: FceCtx; }) {
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

export function TotalItems({ fceCtx }: { fceCtx: FceCtx; }) {
    const totalItems = useAtomValue(fceCtx.fceAtoms.allAtom).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}

//TODO: show folder of the field catalog
//TODO: show folder as an icon in the header and show the path to the folder on hover
