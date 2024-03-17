import { useMemo, useState } from "react";
import { proxy, ref } from "valtio";
import { Tree, DataItemWState, duplicateTree, walkItems, DataItemNavigation, DataItemCore, ItemState } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
// import { data } from "./1-tree-data";
import { useAtomValue, useSetAtom } from "jotai";
import { TreeFileItem, rPanelSelectedAtom, treeFilesAtom } from "@/store";

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
    const snapArrowFirst = true;
    const snapHideFolderIcon = false;

    const treeFiles = useAtomValue(treeFilesAtom);
    const setSelected = useSetAtom(rPanelSelectedAtom);

    // console.log('treeFiles', treeFiles);

    const TreeMemo = useMemo(
        () => {
            const dataWithState = addStateToTreeItems(treeFiles);
            return (
                <Tree
                    data={dataWithState}
                    className={`w-full h-full outline-none`}
                    initialSelectedItemId={undefined}
                    onSelectChange={(item) => {
                        // const selected = findTreeItemById(dataWithState, item?.id);
                        // const text = selected?.fcnt?.cnt || '';
                        // xmlText(text);
                       
                        const selectedAtom = (item as TT)?.fcnt;
                        setSelected(selectedAtom ? selectedAtom : null);
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
