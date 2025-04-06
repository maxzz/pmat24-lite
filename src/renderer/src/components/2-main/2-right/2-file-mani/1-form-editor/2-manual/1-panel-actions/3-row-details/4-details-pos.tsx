import { useAtomValue } from "jotai";
import type { ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";

export function DetailsPos({ item }: { item: ManualFieldState.CtxPos; }) {
    const x = useAtomValue(item.xAtom).data;
    const y = useAtomValue(item.yAtom).data;
    return (
        <div className="hidden @[300px]/actions:block">
            x: {x}, y: {y}
        </div>
    );
}
