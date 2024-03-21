import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";
import { filteredAtom } from "./1-filtered-files";
import { AppIconType, appIcon } from "@/store/store-utils";

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
            // console.log('return treeFiles.atom []');
            return [];
        }

        const filesTree: TreeFileItem[] = files.map(
            (fcntAtom) => {
                const fcnt = get(fcntAtom);
                const site = fcnt.stats.domain || fcnt.fname;
                const fileIcon = fcnt.stats.isWeb ? AppIconType.web : AppIconType.win;
                const rv: TreeFileItem = {
                    id: fcnt.id,
                    name: site,
                    fcnt: fcntAtom,
                    icon: appIcon(fileIcon),
                }
                return rv;
            }
        );

        // console.log('return treeFiles.atom', filesTree);

        return filesTree;
    }
);
