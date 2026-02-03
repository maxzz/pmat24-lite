import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Tree, DataItemWState } from "@ui/shadcn/tree";
import { IconL_AppWindow as IconFile, IconL_Folder as IconFolder } from "@/ui/icons"; // Workflow as IconFile, File as IconFile
import { appSettings } from "@/store/9-ui-state";
import { doTriggerRightPanelSelectedAtom } from "@/store/5-3-right-panel";
import { doManiNameDlgAtom } from "@/store/0-serve-atoms";
import { TreeItemRowRender } from "../2-tree-item";
import { dataWithStateAtom, castTreeItemToFileUs, treeStateAtom, getFileUsAtomByIdAtom } from "./2-tree-action-atoms";
import { ListViewWithDynamicTooltipTest } from "../2-tree-item/3-tree-item-tooltip-wrap";

export function FilesTreeView() {
    const { selectAsTrigger, selectEmptySpace } = useSnapshot(appSettings.files.itemsState);

    const treeState = useAtomValue(treeStateAtom);
    const dataWithState = useAtomValue(dataWithStateAtom);
    const setSelected = useSetAtom(doTriggerRightPanelSelectedAtom);

    const getFileUsAtomById = useSetAtom(getFileUsAtomByIdAtom);
    const doManiNameDlg = useSetAtom(doManiNameDlgAtom);

    function onSelectChange(item: DataItemWState | undefined) {
        const selectFileUsAtom = castTreeItemToFileUs(item!)?.fileUsAtom;
        setSelected({ newAtom: selectFileUsAtom });
    }

    function onDoubleClick() {
        const selected = getFileUsAtomById(treeState.selectedId);
        selected && doManiNameDlg({ fileUsAtom: selected, provideDefaultName: false });
    }

    // print_TreeData(dataWithState);

    return (
        <div className="relative size-full">
            <div className="absolute inset-px bottom-0.5 text-xs select-none">
                
                {/* <div className="size-full grid grid-rows-[1fr_auto]"> */}

                <Tree
                    data={dataWithState}
                    treeState={treeState}
                    className="size-full outline-hidden"
                    scrollAreaProps={{ parentContentWidth: true, fixedWidth: true }}
                    IconTextRender={TreeItemRowRender}
                    IconForFolder={IconFolder}
                    IconForItem={IconFile}
                    arrowFirst={true}
                    hideFolderIcon={false}
                    selectAsTrigger={selectAsTrigger}
                    selectEmptySpace={selectEmptySpace}
                    onSelectChange={onSelectChange}
                    onDoubleClick={onDoubleClick}
                />
                
                {/* <ListViewWithDynamicTooltipTest />
                </div> */}

            </div>
        </div>
    );
}

function print_TreeData(data: DataItemWState[]) {
    console.log('FilesTreeView: length =', data.length);
    data.forEach(
        (item) => {
            console.log('\t\t', item);
        }
    );
}
