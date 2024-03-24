import { useAtomValue } from "jotai";
import { TreeIconAndTextProps } from "@ui/shadcn/tree";
import { treeItemToFileUs } from "../1-files-tree";
import { FileIconAttention } from "./2-file-icon-attention";
// import { FileIndexAttention } from "./2-file-index-attention";
import { classNames } from "@/utils";
import { CardTitleFileIndex } from "./1-file-index";

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const fileUsItem = treeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fcnt);
    const fileIndex = fileUs.idx + 1;
    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    iconClasses = classNames("mr-1.5", iconClasses);

    return (<>
        <CardTitleFileIndex idx={fileIndex} />
        {/* <FileIndexAttention fileUs={fileUs} /> */}

        <FileIconAttention fileUs={fileUs} IconToRender={IconToRender} name={item.name} iconClasses={iconClasses} />

        <span className="flex-grow truncate">
            {item.name}
        </span>
    </>);
}
