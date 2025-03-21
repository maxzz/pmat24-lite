import { atom } from "jotai";
import { type DataItemCore, type DataItemNavigation } from "@/ui/shadcn/tree";
import { type FileUsAtom } from "@/store/store-types";
import { optionsFilesProxyAtom } from "@/store";
import { formTypeToIcon, getFileListIconEnums, getFileListItemDisplayText } from "@/store/store-utils";
import { filteredAtom } from "./1-filtered-files";

export type TreeFcntItem = {
    fileUsAtom: FileUsAtom;
};

export type TreeFileItem<T = {}> = Prettify<
    DataItemNavigation<DataItemCore & TreeFcntItem & T>
>;

export const treeFilesAtom = atom( // files to show in the tree
    (get) => {
        const files = get(filteredAtom);

        if (!files.length) {
            return [];
        }

        const optionsFileList = get(optionsFilesProxyAtom);
        const uiOptShowIeWarnIcon = optionsFileList.itemsState.showIeMarker;

        const filesTree: TreeFileItem[] = files.map(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);

                const rv: TreeFileItem = {
                    id: fileUs.fileCnt.unid,
                    name: getFileListItemDisplayText(fileUs, optionsFileList.itemsState, get),
                    icon: formTypeToIcon(getFileListIconEnums(fileUs, uiOptShowIeWarnIcon)),
                    fileUsAtom,
                };

                return rv;
            }
        );

        return filesTree;
    }
);
