import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { TreeIconAndTextProps } from "@ui/shadcn/tree";
import { treeItemToFileUs } from "../0-files-tree";
import { TreeItemIconWithAttention } from "./2-tree-item-icon";
import { TreeItemFileIndex } from "./1-tree-item-index";
import { TreeItemName } from "./3-tree-item-name";

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {

    const fileUsItem = treeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fileUsAtom);
    const fileIndex = fileUs.fileCnt.idx + 1;
    const IconToRender = item.icon || (!hideFolderIcon && Icon);

    const showIndex = useSnapshot(appSettings).files.itemsState.showIndex;

    return (<>
        {showIndex && (
            <TreeItemFileIndex idx={fileIndex} />
        )}

        <TreeItemIconWithAttention
            iconClasses={iconClasses}
            IconToRender={IconToRender}
            fileUs={fileUs}
            name={item.name}
        />

        <TreeItemName fileUs={fileUs} item={fileUsItem} />
    </>);
}
