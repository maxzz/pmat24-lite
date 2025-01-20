import type { ManualFieldState } from "@/store/1-atoms/3-file-mani-atoms";
import { useAtomValue } from "jotai";

export function DetailsPos({ item }: { item: ManualFieldState.CtxPos; }) {
    const x = useAtomValue(item.xAtom).data;
    const y = useAtomValue(item.yAtom).data;
    return (
        <div className="hidden @[300px]/actions:block">
            x: {x}, y: {y}
        </div>
    );
}
