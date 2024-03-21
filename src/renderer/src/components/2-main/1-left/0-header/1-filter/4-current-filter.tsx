import { searchFilterData } from "@/store";
import { useAtomValue } from "jotai";


export function CurrentFilter() {
    const text = useAtomValue(searchFilterData.textAtom);
    return (
        <div className="flex items-center gap-1">
            <span className="text-xs">{text}</span>
        </div>
    );
}
