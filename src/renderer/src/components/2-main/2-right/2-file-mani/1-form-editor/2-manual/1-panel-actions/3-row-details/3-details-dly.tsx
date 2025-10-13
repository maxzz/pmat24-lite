import { useAtomValue } from "jotai";
import type { ManualFieldState } from "@/store/2-file-mani-atoms";
import { hideBreakpointClasses } from "./8-classes";

export function DetailsDly({ item }: { item: ManualFieldState.CtxDly; }) {
    const n = useAtomValue(item.nAtom).data;
    return (
        <div className={hideBreakpointClasses}>
            {n} ms
        </div>
    );
}
