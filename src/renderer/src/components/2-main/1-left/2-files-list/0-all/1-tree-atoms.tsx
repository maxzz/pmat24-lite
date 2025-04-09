import { atom } from "jotai";
import { proxy } from "valtio";
import { doTriggerRightPanelSelectedAtom, type FileUsAtom, optionsFilesProxyAtom, type TreeFileItem, treeFilesAtom } from "@/store";
import { type TreeState, type DataItemWState, type ItemState, type DataItemNavigation, type DataItemCore, duplicateTree, walkItems, doTreeItemSelect } from "@/ui/shadcn/tree";

export const treeStateAtom = atom<TreeState>(() => {
    return proxy<TreeState>({
        selectedId: undefined,
    });
});

export const dataWithStateAtom = atom<TreeFileItemWState[]>(
    (get) => {
        const treeFiles = get(treeFilesAtom);
        return addStateToTreeItems(treeFiles);
    }
);

// Items state

//type TreeItem = Prettify<ReturnType<typeof addStateToTreeItems>>;
//const dataWithState = addStateToTreeItems(data);

export type TreeFileItemWState = Prettify<TreeFileItem<ItemState>>;

function addStateToTreeItems<T extends TreeFileItem>(data: T[]): TreeFileItemWState[] {
    const newTree = duplicateTree(data) as unknown as TreeFileItemWState[];

    walkItems(newTree, (item) => {
        item.state = proxy<ItemState['state']>({ selected: false/*, uuid5: uuid.asRelativeNumber()*/ });
    });

    // console.log('🌟 new proxies', newTree.map((item) => JSON.stringify({ name: item.id, state: item.state })).join('\n'));
    return newTree;
}

export function treeItemToFileUs(item: DataItemWState | DataItemNavigation<DataItemCore>): TreeFileItemWState {
    return item as TreeFileItemWState;
}

// Set selected item

export const doSelectFileUsTreeAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const treeFiles = get(dataWithStateAtom);
        const treeItem = treeFiles.find((treeFile) => treeFile.fileUsAtom === fileUsAtom);

        const treeState = get(treeStateAtom);
        const { selectAsTrigger, selectEmptySpace } = get(optionsFilesProxyAtom).itemsState;
        if (treeItem) {
            doTreeItemSelect(treeItem, { data: treeFiles, treeState, onSelectChange, selectAsTrigger, selectEmptySpace, });
        }

        function onSelectChange(item: DataItemWState | undefined) {
            set(doTriggerRightPanelSelectedAtom, { newAtom: fileUsAtom });
        }
    }
);
