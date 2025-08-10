import { useAtomValue } from "jotai";
import type { FceCtx } from "@/store/1-atoms/4-field-catalogs";

export function TotalItems({ fceCtx }: { fceCtx: FceCtx; }) {
    const totalItems = useAtomValue(fceCtx.fceAtoms.allAtom).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}
