import { atom } from "jotai";
import { type DataItemCore, type DataItemNavigation } from "@/ui/shadcn/tree";
import { type FileUsAtom } from "@/store/store-types";
import { optionsFilesProxyAtom } from "@/store/9-ui-state";
import { formTypeToIcon, getFileListIconEnums } from "@/store/store-utils";
import { filteredAtom } from "./1-filtered-files";

export type TreeFcntItem = {
    fileUsAtom: FileUsAtom;
};

export type TreeFileItem<T = {}> = Prettify<
    DataItemNavigation<DataItemCore & TreeFcntItem & T>
>;

export const treeFilesAtom = atom<TreeFileItem[]>( // files to show in the tree
    (get) => {
        const files = get(filteredAtom);
        if (!files.length) {
            return [];
        }

        const itemsStateOptions = get(optionsFilesProxyAtom).itemsState;

        const filesTree: TreeFileItem[] = files.map(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);

                const rv: TreeFileItem = {
                    id: fileUs.fileCnt.unid,
                    name: fileUs.fileCnt.fname,
                    icon: formTypeToIcon(getFileListIconEnums(fileUs, itemsStateOptions.showIeMarker)),
                    fileUsAtom,
                };

                return rv;
            }
        );

        return filesTree;
    }
);
