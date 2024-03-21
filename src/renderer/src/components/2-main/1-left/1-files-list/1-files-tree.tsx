import { useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { proxy } from "valtio";
import { TreeFileItem, rightPanelAtom, treeFilesAtom } from "@/store";
import { Tree, DataItemWState, duplicateTree, walkItems, DataItemNavigation, DataItemCore, ItemState } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile

type TT = TreeFileItem<ItemState>;

function addStateToTreeItems<T extends TreeFileItem>(data: T[]): TT[] {
    const newTree = duplicateTree(data) as unknown as (TreeFileItem<ItemState>)[];

    walkItems(newTree, (item) => {
        item.state = proxy({ selected: false });
        item.icon = IconFolder;
    });

    return newTree;
}

//type TreeItem = Prettify<ReturnType<typeof addStateToTreeItems>>;
//const dataWithState = addStateToTreeItems(data);

export type TreeFileItemWState = Prettify<TreeFileItem<ItemState>>;

export function FilesTree() {

    const treeFiles = useAtomValue(treeFilesAtom);
    const setSelected = useSetAtom(rightPanelAtom);

    const TreeMemo = useMemo(
        () => {
            const dataWithState = addStateToTreeItems(treeFiles);
            return (
                <Tree
                    data={dataWithState}
                    className={`w-full h-full outline-none`}
                    IconForFolder={IconFolder}
                    IconForItem={IconFile}
                    arrowFirst={true}
                    hideFolderIcon={false}
                    onSelectChange={(item) => setSelected((item as TT)?.fcnt)}
                />
            );
        }, [treeFiles]
    );

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-px bottom-0.5 text-xs select-none">
                {TreeMemo}
            </div>
        </div>
    );
}
