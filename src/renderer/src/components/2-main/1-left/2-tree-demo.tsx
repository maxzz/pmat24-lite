import { useMemo, useState } from "react";
import { proxy } from "valtio";
import { Tree, DataItemWState, DataItem, duplicateTree, findTreeItemById, walkItems, DataItemNav } from "@ui/shadcn/tree";
import { AppWindow as IconFile, Folder as IconFolder } from "lucide-react"; // Workflow as IconFile, File as IconFile
import { data } from "./1-tree-data";
import { useAtomValue } from "jotai";
import { TreeFileItem, treeFilesAtom } from "@/store";

const initialItemId = "6.1.2";

function addStateToTreeItems<T extends DataItemNav>(data: T[]): (T & DataItemWState)[] {
    const newTree = duplicateTree(data);
    walkItems(newTree, (item) => (item as T & DataItemWState).state = proxy({ selected: false }));
    return newTree as (T & DataItemWState)[];
}

type TreeItem = Prettify<ReturnType<typeof addStateToTreeItems>>;

//const dataWithState = addStateToTreeItems(data);

export function FilesTree() {

    const [content, setContent] = useState(() => {
        return "No content selected";
    });

    const snapArrowFirst = true;
    const snapHideFolderIcon = false;

    const treeFiles = useAtomValue(treeFilesAtom);

    const TreeMemo = useMemo(
        () => {
            const dataWithState = addStateToTreeItems(treeFiles);
            return (
                <Tree
                    data={dataWithState}
                    className={`w-full h-full outline-none`}
                    initialSelectedItemId={undefined}
                    onSelectChange={(item) => setContent(item?.name ?? "")}
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
