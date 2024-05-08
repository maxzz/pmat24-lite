import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { FileUs } from "@/store/store-types";
import { TreeIconAndTextProps } from "@ui/shadcn/tree";
import { TreeFileItemWState, treeItemToFileUs } from "../0-files-tree";
import { FileIconAttention } from "./2-file-icon-attention";
import { classNames } from "@/utils";
import { CardTitleFileIndex } from "./1-file-index";
import { SymbolFire } from "@/ui/icons";

function TreeItemName({ fileUs, item }: { fileUs: FileUs; item: TreeFileItemWState; }) {
    const changes = useSnapshot(fileUs.changesSet);
    const hasChanges = !!changes.size;
    return (
        <span className={classNames("1ml-1.5 flex-grow truncate flex items-center", hasChanges && "!text-orange-300")}>
            {hasChanges && (<>
                {/* {'* '} */}
                <SymbolFire className="size-3 mr-0.5" />
            </>)}
            {item.name}
        </span>
    );
}

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const fileUsItem = treeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fcnt);
    const fileIndex = fileUs.idx + 1;
    const IconToRender = item.icon || (!hideFolderIcon && Icon);

    const changes = useSnapshot(fileUs.changesSet);
    const hasChanges = !!changes.size;

    const showIndex = useSnapshot(appSettings).fileList.itemsState.showIndex;

    return (<>
        {showIndex && (
            <CardTitleFileIndex idx={fileIndex} />
        )}

        <FileIconAttention
            fileUs={fileUs}
            IconToRender={IconToRender}
            name={item.name}
            iconClasses={iconClasses}
        />

        <TreeItemName fileUs={fileUs} item={fileUsItem} />
    </>);
}
