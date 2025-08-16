import { useAtomValue } from "jotai";
import type { ManualFieldState } from "@/store/2-file-mani-atoms";

export function DetailsDly({ item }: { item: ManualFieldState.CtxDly; }) {
    const n = useAtomValue(item.nAtom).data;
    return (
        <div className={containerClasses}>
            {n} ms
        </div>
    );
}

//const containerClasses = "hidden @[300px]/actions:block";
const containerClasses = "hidden @[300px]/actions:flex items-center justify-end space-x-1";
