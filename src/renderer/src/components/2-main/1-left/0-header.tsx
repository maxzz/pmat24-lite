import { useAtomValue } from "jotai";
import { treeFilesAtom } from "@/store";
import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function PanelHeader({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    const treeFiles = useAtomValue(treeFilesAtom);
    return (
        <div className={classNames("px-3 py-2 text-xs bg-muted border-border border-b group-focus-within:bg-background/30 select-none", className)} {...rest}>
            Files
            {treeFiles?.length > 0 && <span className="ml-2 text-sm text-text/60">{treeFiles.length}</span>}
        </div>
    );
}
