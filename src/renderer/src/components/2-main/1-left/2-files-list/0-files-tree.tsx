import { useMemo, useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { proxy, useSnapshot } from "valtio";
import { TreeFileItem, appSettings, doTriggerRightPanelSelectedAtom, treeFilesAtom } from "@/store";
import { Tree, DataItemWState, duplicateTree, walkItems, DataItemNavigation, DataItemCore, ItemState, TreeState } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { TreeItemRowRender } from "./2-tree-item";

export function FilesTree() {
    const {selectAsTrigger, selectEmptySpace} = useSnapshot(appSettings.files.itemsState);

    const treeFiles = useAtomValue(treeFilesAtom);
    const setSelected = useSetAtom(doTriggerRightPanelSelectedAtom);

    function onSelectChange(item: DataItemWState | undefined) {
        const selectFileUsAtom = treeItemToFileUs(item!)?.fileUsAtom;
        setSelected({ newAtom: selectFileUsAtom })
    }

    // const [treeState] = useState(() => {
    //     const uiState = proxy<TreeState>({
    //         selectedId: undefined,
    //     });
    //     return uiState;
    // });

    const treeState = useAtomValue(treeStateAtom);

    const TreeMemo = useMemo(
        () => {
            const dataWithState = addStateToTreeItems(treeFiles);
            return (
                <Tree
                    data={dataWithState}
                    treeState={treeState}
                    className="w-full h-full outline-none"
                    scrollAreaProps={{ parentContentWidth: true, fixedWidth: true }}
                    IconTextRender={TreeItemRowRender}
                    IconForFolder={IconFolder}
                    IconForItem={IconFile}
                    arrowFirst={true}
                    hideFolderIcon={false}
                    selectAsTrigger={selectAsTrigger}
                    selectEmptySpace={selectEmptySpace}
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

const treeStateAtom = atom<TreeState>(() => {
    return proxy<TreeState>({
        selectedId: undefined,
    });
});

// const [treeState] = useState(() => {
//     const uiState = proxy<TreeState>({
//         selectedId: undefined,
//     });
//     return uiState;
// });
