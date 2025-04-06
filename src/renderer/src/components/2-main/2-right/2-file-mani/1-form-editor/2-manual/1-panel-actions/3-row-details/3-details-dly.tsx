import { useAtomValue } from "jotai";
import type { ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";

export function DetailsDly({ item }: { item: ManualFieldState.CtxDly; }) {
    const n = useAtomValue(item.nAtom).data;
    return (
        <div className="hidden @[300px]/actions:block">
            {n} ms
        </div>
    );
}
