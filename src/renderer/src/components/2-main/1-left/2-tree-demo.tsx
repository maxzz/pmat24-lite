import { useMemo, useState } from "react";
import { proxy } from "valtio";
import { Tree, DataItemWState, DataItem, duplicateTree, findTreeItemById, walkItems } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { inputFocusClasses } from "@ui/shared-styles";
import { data } from "./1-tree-data";

const initialItemId = "6.1.2";

function addStateToTreeItems(data: DataItem[]): DataItemWState[] {
    const newTree = duplicateTree(data);
    walkItems(newTree, (item) => (item as DataItemWState).state = proxy({ selected: false }));
    return newTree as DataItemWState[];
}

const dataWithState = addStateToTreeItems(data);

export function DemoTreeWithOptions() {
    const [content, setContent] = useState(() => {
        const initialItem = findTreeItemById(dataWithState, initialItemId);
        return initialItem?.name || "No content selected";
    });

    const snapArrowFirst = true;
    const snapHideFolderIcon = false;

    const TreeMemo = useMemo(
        () => {
            return (
                <Tree
                    data={dataWithState}
                    className={`w-full h-full rounded-l-md ${inputFocusClasses}`}
                    initialSelectedItemId={initialItemId}
                    onSelectChange={(item) => setContent(item?.name ?? "")}
                    IconForFolder={IconFolder}
                    IconForItem={IconFile}
                    arrowFirst={snapArrowFirst}
                    hideFolderIcon={snapHideFolderIcon}
                />
            );
        }, [snapArrowFirst, snapHideFolderIcon]
    );

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-px bottom-0.5 text-xs select-none">
                {TreeMemo}
            </div>
        </div>
    );
}
