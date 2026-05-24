import { useAtomValue } from "jotai";
import type { FceCtx } from "@/components/4-dialogs/4-dlg-field-catalog/a-field-catalog-atoms";

export function TotalItems({ fceCtx }: { fceCtx: FceCtx; }) {
    const totalItems = useAtomValue(fceCtx.fceAtoms.allAtom).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}
