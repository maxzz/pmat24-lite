import { TreeIconAndTextProps } from "@ui/shadcn/tree";
import { treeItemToFileUs } from "./1-files-tree";
import { useAtomValue } from "jotai";
import { CardTitleAttention } from "./3-tree-item-attention";

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const fileUsItem = treeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fcnt);

    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    return (<>
        <CardTitleAttention fileUs={fileUs} />
        
        {IconToRender && <IconToRender className={iconClasses} aria-hidden="true" />}

        <span className="flex-grow truncate">
            {item.name}
        </span>
    </>);
}
