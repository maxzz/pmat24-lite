import { atom } from "jotai";
import { proxy } from "valtio";
import { type TreeFileItem, treeFilesAtom } from "@/store";
import { type TreeState, type DataItemWState, type ItemState, duplicateTree, walkItems, type DataItemNavigation, type DataItemCore } from "@/ui/shadcn/tree";

//type TreeItem = Prettify<ReturnType<typeof addStateToTreeItems>>;
//const dataWithState = addStateToTreeItems(data);

export type TreeFileItemWState = Prettify<TreeFileItem<ItemState>>;

export function treeItemToFileUs(item: DataItemWState | DataItemNavigation<DataItemCore>): TreeFileItemWState {
    return item as TreeFileItemWState;
}

export const treeStateAtom = atom<TreeState>(() => {
    return proxy<TreeState>({
        selectedId: undefined,
    });
});

export const dataWithStateAtom = atom<DataItemWState[]>(
    (get) => {
        const treeFiles = get(treeFilesAtom);
        return addStateToTreeItems(treeFiles);
    }
);

function addStateToTreeItems<T extends TreeFileItem>(data: T[]): TreeFileItemWState[] {
    const newTree = duplicateTree(data) as unknown as (TreeFileItem<ItemState>)[];

    walkItems(newTree, (item) => {
        item.state = proxy({ selected: false });
    });

    return newTree;
}
