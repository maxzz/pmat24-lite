import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import { appIcon, fileUsToIcon } from "@/store/store-utils";
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
                (fcntAtom) => {
                    const fcnt = get(fcntAtom);
                    if (fcnt.fcat || !fcnt.mani) {
                        return;
                    }
                    const site = fcnt.stats.domain || fcnt.fname;
                    const { icon, hasBailOut } = fileUsToIcon(fcnt);
                    const rv: TreeFileItem = {
                        id: fcnt.id,
                        name: site,
                        fcnt: fcntAtom,
                        icon: appIcon(icon, hasBailOut),
                    };
                    return rv;
                }
            )
            .filter(Boolean);

        return filesTree;
    }
);
