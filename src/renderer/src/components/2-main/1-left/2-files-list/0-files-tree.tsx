import { useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { proxy, useSnapshot } from "valtio";
import { TreeFileItem, appSettings, doSetRightPanelSelectedAtom, treeFilesAtom } from "@/store";
import { Tree, DataItemWState, duplicateTree, walkItems, DataItemNavigation, DataItemCore, ItemState } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { TreeIconAndText } from "./2-tree-item";

//type TreeItem = Prettify<ReturnType<typeof addStateToTreeItems>>;
//const dataWithState = addStateToTreeItems(data);

export type TreeFileItemWState = Prettify<TreeFileItem<ItemState>>;

export function treeItemToFileUs(item: DataItemWState | DataItemNavigation<DataItemCore>): TreeFileItemWState {
    return item as TreeFileItemWState;
}

function addStateToTreeItems<T extends TreeFileItem>(data: T[]): TreeFileItemWState[] {
    const newTree = duplicateTree(data) as unknown as (TreeFileItem<ItemState>)[];

    walkItems(newTree, (item) => {
        item.state = proxy({ selected: false });
    });

    return newTree;
}

export function FilesTree() {
    const snapItems = useSnapshot(appSettings).files.itemsState;

    const treeFiles = useAtomValue(treeFilesAtom);
    const setSelected = useSetAtom(doSetRightPanelSelectedAtom);

    function onSelectChange(item: DataItemWState | undefined) {
        const newAtom = treeItemToFileUs(item!)?.fileUsAtom;
        setSelected({ newAtom })
    }

    const TreeMemo = useMemo(
        () => {
            const dataWithState = addStateToTreeItems(treeFiles);
            return (
                <Tree
                    data={dataWithState}
                    className="w-full h-full outline-none"
                    scrollAreaProps={{ parentContentWidth: true }}
                    IconTextRender={TreeIconAndText}
                    IconForFolder={IconFolder}
                    IconForItem={IconFile}
                    arrowFirst={true}
                    hideFolderIcon={false}
                    selectAsTrigger={snapItems.selectAsTrigger}
                    selectEmptySpace={snapItems.selectEmptySpace}
                    onSelectChange={onSelectChange}
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
