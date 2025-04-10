import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, doTriggerRightPanelSelectedAtom } from "@/store";
import { Tree, DataItemWState } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { TreeItemRowRender } from "../2-tree-item";
import { dataWithStateAtom, castTreeItemToFileUs, treeStateAtom } from "./1-tree-atoms";

export function FilesTreeView() {
    const { selectAsTrigger, selectEmptySpace } = useSnapshot(appSettings.files.itemsState);

    const treeState = useAtomValue(treeStateAtom);
    const dataWithState = useAtomValue(dataWithStateAtom);
    const setSelected = useSetAtom(doTriggerRightPanelSelectedAtom);

    function onSelectChange(item: DataItemWState | undefined) {
        const selectFileUsAtom = castTreeItemToFileUs(item!)?.fileUsAtom;
        setSelected({ newAtom: selectFileUsAtom });
    }
    
    // printTreeData(dataWithState);

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-px bottom-0.5 text-xs select-none">
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
            </div>
        </div>
    );
}

function printTreeData(data: DataItemWState[]) {
    console.log('FilesTreeView: length =', data.length);
    data.forEach(
        (item) => {
            console.log('\t\t', item);
        }
    );
}
