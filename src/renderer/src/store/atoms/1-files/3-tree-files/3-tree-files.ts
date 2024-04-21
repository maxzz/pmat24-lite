import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import { appTypeToIcon, fileUsToAppType, getFileListDisplayName } from "@/store/store-utils";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";
import { filteredAtom } from "./1-filtered-files";

export type TreeFcntItem = {
    fcnt: FileUsAtomType;
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

        const filesTree: TreeFileItem[] = files
            .map(
                (fileUsAtom) => {
                    const fileUs = get(fileUsAtom);

                    if (fileUs.fcat || !fileUs.mani) {
                        return;
                    }

                    const { icon, hasBailOut } = fileUsToAppType(fileUs);

                    const rv: TreeFileItem = {
                        id: fileUs.id,
                        name: getFileListDisplayName(fileUs),
                        icon: appTypeToIcon(icon, hasBailOut),
                        fcnt: fileUsAtom,
                    };

                    return rv;
                }
            )
            .filter(Boolean);

        return filesTree;
    }
);


