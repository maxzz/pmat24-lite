import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { TreeIconAndTextProps } from "@ui/shadcn/tree";
import { treeItemToFileUs } from "../0-files-tree";
import { FileIconAttention } from "./2-file-icon-attention";
import { classNames } from "@/utils";
import { CardTitleFileIndex } from "./1-file-index";

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const fileUsItem = treeItemToFileUs(item);
    const fileUs = useAtomValue(fileUsItem.fcnt);
    const fileIndex = fileUs.idx + 1;
    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    
    //const isDirty = fileUs.changesAtom
    //const maniAtoms = useAtomValue(fileUs.atomsAtom);

    const showIndex = useSnapshot(appSettings).fileList.itemsState.showIndex;

    return (<>
        {showIndex && (
            <CardTitleFileIndex idx={fileIndex} />
        )}

        <FileIconAttention
            fileUs={fileUs}
            IconToRender={IconToRender}
            name={item.name}
            iconClasses={classNames("mr-1.5", iconClasses)}
        />

        <span className="flex-grow truncate">
            {item.name}
        </span>
    </>);
}
