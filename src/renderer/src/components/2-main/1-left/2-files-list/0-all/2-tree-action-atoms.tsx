import { atom } from "jotai";
import { proxy } from "valtio";
import { optionsFilesProxyAtom } from "@/store/9-ui-state";
import { doTriggerRightPanelSelectedAtom, rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { type TreeState, type DataItemWState, type ItemState, type DataItemNavigation, type DataItemCore, duplicateTree, walkItems, doTreeItemSelect } from "@/ui/shadcn/tree";
import { type FileUsAtom } from "@/store/store-types";
import { type TreeFileItem, treeFilesAtom } from "@/store/5-2-tree-files";

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

    walkItems(newTree, // create proxy for each item
        (item) => {
            item.state = proxy<ItemState['state']>({ selected: false/*, uuid5: uuid.asRelativeNumber()*/ });
        }
    );

    //printTreeItemsArray('🌟 new proxies', newTree);
    return newTree;
}

export function castTreeItemToFileUs(item: DataItemWState | DataItemNavigation<DataItemCore>): TreeFileItemWState {
    return item as TreeFileItemWState;
}

export const getFileUsAtomByIdAtom = atom( // Non-reactive access to atom by treeItem.id (mostly to the right panel atom)
    null,
    (get, set, id: string | number | undefined): FileUsAtom | undefined => {
        const treeFiles = get(dataWithStateAtom);
        const treeItem = treeFiles.find((treeFile) => treeFile.id === id);
        return treeItem?.fileUsAtom;
    }
);

// Set selected item

export const doSelectFileUsTreeAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const treeFiles = get(dataWithStateAtom);
        const treeState = get(treeStateAtom);
        const { selectAsTrigger, selectEmptySpace } = get(optionsFilesProxyAtom).itemsState;

        const treeItem = treeFiles.find((treeFile) => treeFile.fileUsAtom === fileUsAtom);

        if (treeItem) {
            setTimeout(
                () => {
                    doTreeItemSelect(treeItem, {
                        data: treeFiles,
                        treeState,
                        onSelectChange: (item: DataItemWState | undefined) => set(doTriggerRightPanelSelectedAtom, { newAtom: fileUsAtom }),
                        selectAsTrigger,
                        selectEmptySpace,
                    });
                }, 500
            ); // It's OK if deley will be 0, but delay is good for UX (to show dynamic of changes)
        } else {
            console.error('not.in.tree');
        }
    }
);

export const doUpdateTreeSelectedByRightPanelAtom = atom(
    null,
    (get, set) => {
        const rightPanelFileUsAtom = get(rightPanelAtomAtom);

        const treeFiles = get(dataWithStateAtom);
        const treeState = get(treeStateAtom);
        const { selectAsTrigger, selectEmptySpace } = get(optionsFilesProxyAtom).itemsState;

        const treeItem = treeFiles.find((treeFile) => treeFile.fileUsAtom === rightPanelFileUsAtom);
        //console.log(`doUpdateRightPanelSelectedAtom right:${rightPanelFileUsAtom?.toString()} treeItem:`, { atom: treeItem?.fileUsAtom?.toString(), ...treeItem });

        //printTreeItemsArray('🌟🌟 proxies after', treeFiles);

        if (!treeItem) {
            treeState.selectedId = undefined;
            set(doTriggerRightPanelSelectedAtom, { newAtom: undefined });
        } else {
            if (treeState.selectedId === treeItem.id) {
                treeState.selectedId = undefined;
            }
            treeItem.state.selected = false;

            doTreeItemSelect(treeItem, {
                data: treeFiles,
                treeState,
                onSelectChange: (item: DataItemWState | undefined) => set(doTriggerRightPanelSelectedAtom, { newAtom: rightPanelFileUsAtom }),
                selectAsTrigger,
                selectEmptySpace,
            });
        }

        //printTreeItemsArray('🌟🌟 proxies after', treeFiles);
    }
);

//

function printTreeItemsArray(title: string, newTree: TreeFileItemWState[]) {
    const all = `\n${newTree.map((item) => `    ${JSON.stringify({ atom: item.fileUsAtom?.toString(), "tree.id": item.id, state: item.state })}`).join('\n')}`;
    console.log(`${title}: ${newTree.length ? all : '[]'}`);
}
