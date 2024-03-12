import { useMemo, useState } from "react";
import { proxy } from "valtio";
import { Tree, DataItemWState, duplicateTree, findTreeItemById, walkItems, DataItemNavigation, DataItemCore, ItemState } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { data } from "./1-tree-data";
import { useAtomValue, useSetAtom } from "jotai";
import { TreeFileItem, treeFilesAtom, xmlTextAtom } from "@/store";

const initialItemId = "6.1.2";

type TT = TreeFileItem<ItemState>;

function addStateToTreeItems<T extends TreeFileItem>(data: T[]): TT[] {
    const newTree = duplicateTree(data) as unknown as (TreeFileItem<ItemState>)[];
    walkItems(newTree, (item) => { item.state = proxy({ selected: false }); });
    return newTree;
}

//type TreeItem = Prettify<ReturnType<typeof addStateToTreeItems>>;

//const dataWithState = addStateToTreeItems(data);

export type TreeFileItemWState = Prettify<TreeFileItem<ItemState>>;

export function FilesTree() {

    const [content, setContent] = useState(() => {
        return "No content selected";
    });

    const snapArrowFirst = true;
    const snapHideFolderIcon = false;

    const treeFiles = useAtomValue(treeFilesAtom);

    const xmlText = useSetAtom(xmlTextAtom);

    const TreeMemo = useMemo(
        () => {
            const dataWithState = addStateToTreeItems(treeFiles);
            return (
                <Tree
                    data={dataWithState}
                    className={`w-full h-full outline-none`}
                    initialSelectedItemId={undefined}
                    onSelectChange={(item) => {
                        const selected = findTreeItemById(dataWithState, item?.id);

                        console.log('onSelectChange', selected);

                        const text = selected?.fcnt?.cnt || '';
                        xmlText(text);

                        setContent(item?.name ?? "");
                    }}
                    IconForFolder={IconFolder}
                    IconForItem={IconFile}
                    arrowFirst={snapArrowFirst}
                    hideFolderIcon={snapHideFolderIcon}
                />
            );
        }, [treeFiles, snapArrowFirst, snapHideFolderIcon]
    );

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-px bottom-0.5 text-xs select-none">
                {TreeMemo}
            </div>
        </div>
    );
}
