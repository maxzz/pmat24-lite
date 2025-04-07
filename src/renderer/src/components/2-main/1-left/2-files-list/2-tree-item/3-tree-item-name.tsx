import { useSnapshot } from "valtio";
import { FileUs } from "@/store/store-types";
import { type TreeFileItemWState } from "../0-all/1-tree-atoms";
import { classNames } from "@/utils";
import { SymbolFire } from "@/ui/icons";

export function TreeItemName({ fileUs, item }: { fileUs: FileUs; item: TreeFileItemWState; }) {

    const changes = useSnapshot(fileUs.fileCnt.changesSet);
    const hasChanges = !!changes.size;
    const title = hasChanges ? "This file has changes" : undefined;

    return (<>
        {hasChanges && (
            <SymbolFire className="flex-none mr-0.5 size-3" colorize />
        )}

        <div className={classNames("truncate", hasChanges && "text-orange-500 1font-semibold")} title={title}>
            {item.name}
        </div>
    </>);
}
