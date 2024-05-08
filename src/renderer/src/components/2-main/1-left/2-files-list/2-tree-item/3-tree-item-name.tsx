import { useSnapshot } from "valtio";
import { FileUs } from "@/store/store-types";
import { TreeFileItemWState } from "../0-files-tree";
import { classNames } from "@/utils";
import { SymbolFire } from "@/ui/icons";

export function TreeItemName({ fileUs, item }: { fileUs: FileUs; item: TreeFileItemWState; }) {

    const changes = useSnapshot(fileUs.changesSet);
    const hasChanges = !!changes.size;

    return (
        <span className={classNames("flex-grow truncate flex items-center", hasChanges && "!text-orange-300")}>

            {hasChanges && (
                <SymbolFire className="mr-0.5 size-3" />
            )}

            {item.name}
        </span>
    );
}
