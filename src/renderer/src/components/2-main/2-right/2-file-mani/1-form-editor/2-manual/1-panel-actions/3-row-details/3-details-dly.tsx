import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import type { ManualFieldState } from "@/store/2-file-mani-atoms";
import { hideBreakpointClasses } from "./8-classes";

export function DetailsDly({ item }: { item: ManualFieldState.CtxDly; }) {
    const n = useAtomValue(item.nAtom).data;
    return (
        <div className={classNames(hideBreakpointClasses, "justify-end!")}>
            {n} ms
        </div>
    );
}
