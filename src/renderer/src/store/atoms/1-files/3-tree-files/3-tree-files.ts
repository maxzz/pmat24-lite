import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { fileListOptionsAtom } from "@/store";
import { appTypeToIcon, fileUsToAppType, getFileListDisplayText } from "@/store/store-utils";
import { filteredAtom } from "./1-filtered-files";
import { type DataItemCore, type DataItemNavigation } from "@/ui/shadcn/tree";

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

        const fileListOptions = get(fileListOptionsAtom);
        const showIeWranIcon = fileListOptions.itemsState.showIeMarker;

        const filesTree: TreeFileItem[] = files.map(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);

                const rv: TreeFileItem = {
                    id: fileUs.fileCnt.unid,
                    name: getFileListDisplayText(fileUs, fileListOptions.itemsState, get),
                    icon: appTypeToIcon(fileUsToAppType(fileUs, showIeWranIcon)),
                    fileUsAtom,
                };

                return rv;
            }
        );

        return filesTree;
    }
);
