import { useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { TreeFileItem, appSettings, doTriggerRightPanelSelectedAtom } from "@/store";
import { Tree, DataItemWState, DataItemNavigation, DataItemCore, ItemState } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { TreeItemRowRender } from "./2-tree-item";
import { dataWithStateAtom, treeItemToFileUs, treeStateAtom } from "./1-tree-atoms";

export function FilesTree() {
    const { selectAsTrigger, selectEmptySpace } = useSnapshot(appSettings.files.itemsState);

    const dataWithState = useAtomValue(dataWithStateAtom);
    // const treeFiles = useAtomValue(treeFilesAtom);
    const setSelected = useSetAtom(doTriggerRightPanelSelectedAtom);

    function onSelectChange(item: DataItemWState | undefined) {
        const selectFileUsAtom = treeItemToFileUs(item!)?.fileUsAtom;
        setSelected({ newAtom: selectFileUsAtom });
    }

    const treeState = useAtomValue(treeStateAtom);

    const TreeMemo = useMemo(
        () => {
            // const dataWithState = addStateToTreeItems(treeFiles);
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
        }, [dataWithState]
        // }, [treeFiles]
    );

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-px bottom-0.5 text-xs select-none">
                {TreeMemo}
            </div>
        </div>
    );
}
