import { useAtomValue } from "jotai";
import { TreeIconAndTextProps } from "@ui/shadcn/tree";
import { treeItemToFileUs } from "../0-files-tree";
import { FileIconAttention } from "./2-file-icon-attention";
import { classNames } from "@/utils";
import { CardTitleFileIndex } from "./1-file-index";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const fileUsItem = treeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fcnt);
    const fileIndex = fileUs.idx + 1;
    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    iconClasses = classNames("mr-1.5", iconClasses);

    const showIndex = useSnapshot(appSettings).ui.fileListOptions.fileListItems.showIndex;

    return (<>
        {showIndex && <CardTitleFileIndex idx={fileIndex} />}

        <FileIconAttention fileUs={fileUs} IconToRender={IconToRender} name={item.name} iconClasses={iconClasses} />

        <span className="flex-grow truncate">
            {item.name}
        </span>
    </>);
}
