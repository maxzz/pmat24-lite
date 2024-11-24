import { useSnapshot } from "valtio";
import { allFileUsChanges } from "@/store/atoms/3-file-mani-atoms";
import { SymbolFire } from "@/ui/icons";

export function ChangeIndicator() {
    
    const changed = useSnapshot(allFileUsChanges).size;
    if (!changed) {
        return null;
    }

    return (
        <div className="px-1.5 py-0.5 text-orange-800 bg-orange-400 border-border border rounded flex items-center">

            <SymbolFire className="mr-0.5 size-3 text-orange-800 opacity-70" colorize />

            <span className="text-[0.65rem] w-max">
                {changed} unsaved
            </span>
        </div>
    );
}
