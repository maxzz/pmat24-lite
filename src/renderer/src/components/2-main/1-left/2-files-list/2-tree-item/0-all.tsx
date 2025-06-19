import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, getTreeItemDisplayText } from "@/store";
import { type TreeIconAndTextProps } from "@ui/shadcn/tree";
import { castTreeItemToFileUs } from "../0-all/2-tree-action-atoms";
import { TreeItemIconWithAttention } from "./2-tree-item-icon";
import { TreeItemFileIndex } from "./1-tree-item-file-index";
import { TreeItemName } from "./5-tree-item-name";

/**
 * This is used by FilesTreeView.
 */
export function TreeItemRowRender({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {

    const fileUsItem = castTreeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fileUsAtom);
    const fileIndex = fileUs.fileCnt.idx + 1;
    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    
    const chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom);
    const displayText = getTreeItemDisplayText(fileUs, appSettings.files.itemsState, chooseName);

    const showIndex = useSnapshot(appSettings.files.itemsState).showIndex;

    return (<>
        {showIndex && (
            <TreeItemFileIndex idx={fileIndex} />
        )}

        <TreeItemIconWithAttention
            iconClasses={iconClasses}
            IconToRender={IconToRender}
            fileUs={fileUs}
            name={displayText}
        />

        <TreeItemName fileUs={fileUs} item={fileUsItem} />
    </>);
}
