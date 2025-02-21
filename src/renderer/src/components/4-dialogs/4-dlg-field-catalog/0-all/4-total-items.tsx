import { useAtomValue } from "jotai";
import type { FceCtx } from "@/store";

export function TotalItems({ fceCtx }: { fceCtx: FceCtx; }) {
    const totalItems = useAtomValue(fceCtx.fceAtoms.allAtom).length;
    return (<>
        {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
    </>);
}
