import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";
import { fileListOptionsAtom } from "@/store/app-settings";
import { appTypeToIcon, fileUsToAppType, getFileListDisplayName } from "@/store/store-utils";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";
import { filteredAtom } from "./1-filtered-files";

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

        const filesTree: TreeFileItem[] = files
            .map(
                (fileUsAtom) => {
                    const fileUs = get(fileUsAtom);

                    if (fileUs.fcat || !fileUs.mani) {
                        return;
                    }

                    const rv: TreeFileItem = {
                        id: fileUs.id,
                        name: getFileListDisplayName(fileUs, fileListOptions.itemsState),
                        icon: appTypeToIcon(fileUsToAppType(fileUs)),
                        fcnt: fileUsAtom,
                    };

                    return rv;
                }
            )
            .filter(Boolean);

        return filesTree;
    }
);
