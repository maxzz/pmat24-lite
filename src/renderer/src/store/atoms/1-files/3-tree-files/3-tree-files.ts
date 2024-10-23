import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { filteredAtom } from "./1-filtered-files";
import { fileListOptionsAtom } from "@/store/app-settings";
import { appTypeToIcon, fileUsToAppType, getFileListDisplayName } from "@/store/store-utils";
import { type DataItemCore, type DataItemNavigation } from "@/ui/shadcn/tree";

export type TreeFcntItem = {
    fcnt: FileUsAtom;
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
                    name: getFileListDisplayName(fileUs, fileListOptions.itemsState, get),
                    icon: appTypeToIcon(fileUsToAppType(fileUs, showIeWranIcon)),
                    fcnt: fileUsAtom,
                };

                return rv;
            }
        );

        return filesTree;
    }
);
