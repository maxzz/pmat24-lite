import { useSetAtom } from "jotai";
import { type FceCtx, doCancelFceDlgAtom } from "@/store";
import { DialogCloseButton } from "@/ui/shadcn/dialog";
// import { SymbolFolder } from "@/ui/icons";

export function Header({ fceCtx }: { fceCtx: FceCtx; }) {

    const doCancelFldCatDialog = useSetAtom(doCancelFceDlgAtom);

    // const openMainDlg = !fceCtx.inData?.openSelectItemDlg;
    // const fname = fceCtx.fceAtoms?.fileUs.fileCnt?.fpath; //TODO: if hasMain() then show path relative to main fc file, or none if main fc file

    return (
        <div className="relative py-2 border-border border-b flex flex-col items-center">
            <div className="text-xs font-semibold">
                Field Catalog
            </div>

            {/* {!openMainDlg &&
                <div className="opacity-50 flex items-center justify-start gap-1">
                    <SymbolFolder className="size-4" />
                    {fname ? fname : 'root'}
                </div>
            } */}

            <DialogCloseButton
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-muted hover:rounded-sm"
                onClick={doCancelFldCatDialog}
                tabIndex={-1}
            />
        </div>
    );
}
