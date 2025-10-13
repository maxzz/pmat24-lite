import { useAtomValue } from "jotai";
import type { ManualFieldState } from "@/store/2-file-mani-atoms";
import { hideBreakpointClasses } from "./8-classes";

export function DetailsPos({ item }: { item: ManualFieldState.CtxPos; }) {
    const x = useAtomValue(item.xAtom).data;
    const y = useAtomValue(item.yAtom).data;
    return (
        <div className={hideBreakpointClasses}>
            x: {x}, y: {y}
        </div>
    );
}
