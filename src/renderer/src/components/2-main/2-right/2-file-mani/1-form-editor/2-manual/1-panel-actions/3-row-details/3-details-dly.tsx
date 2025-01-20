import type { ManualFieldState } from "@/store/1-atoms/3-file-mani-atoms";
import { useAtomValue } from "jotai";

export function DetailsDly({ item }: { item: ManualFieldState.CtxDly; }) {
    const n = useAtomValue(item.nAtom).data;
    return (
        <div className="hidden @[300px]/actions:block">
            {n} ms
        </div>
    );
}
