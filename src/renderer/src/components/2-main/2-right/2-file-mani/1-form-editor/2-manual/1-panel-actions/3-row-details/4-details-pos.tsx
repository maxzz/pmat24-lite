import { useAtomValue } from "jotai";
import type { ManualFieldState } from "@/store/2-file-mani-atoms";

export function DetailsPos({ item }: { item: ManualFieldState.CtxPos; }) {
    const x = useAtomValue(item.xAtom).data;
    const y = useAtomValue(item.yAtom).data;
    return (
        <div className={containerClasses}>
            x: {x}, y: {y}
        </div>
    );
}

//const containerClasses = "hidden @[300px]/actions:block";
const containerClasses = "hidden @[300px]/actions:flex items-center justify-end space-x-1";
