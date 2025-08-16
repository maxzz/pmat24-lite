import { useSnapshot } from "valtio";
import { allFileUsChanges } from "@/store/1-file-mani-atoms";
import { SymbolFire } from "@/ui/icons";

export function ChangeIndicator() {
    const changed = useSnapshot(allFileUsChanges).size;
    if (!changed) {
        return null;
    }

    return (
        <div className="px-1.5 py-0.5 text-background bg-orange-600 dark:bg-orange-400 shadow flex items-center"> {/* 1border-border 1border 1rounded */}
            {/* <SymbolFire className="mr-0.5 size-3 text-orange-500 opacity-70" colorize /> */}

            <span className="text-[0.65rem] w-max">
                {changed} unsaved
            </span>
        </div>
    );
}

//TODO: on click show confirmation dialog to save all changes
