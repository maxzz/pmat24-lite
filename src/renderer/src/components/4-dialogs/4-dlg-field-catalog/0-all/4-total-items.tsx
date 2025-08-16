import { useAtomValue } from "jotai";
import type { FceCtx } from "@/store/3-field-catalog-atoms";

export function TotalItems({ fceCtx }: { fceCtx: FceCtx; }) {
    const totalItems = useAtomValue(fceCtx.fceAtoms.allAtom).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}
