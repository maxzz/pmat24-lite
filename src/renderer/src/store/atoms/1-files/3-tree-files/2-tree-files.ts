import { atom } from "jotai";
import { FileUs, FileUsAtomType } from "@/store/store-types";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";
import { filteredAtom } from "./1-filtered-files";
import { AppIconType, appIcon, isAnyIe6, isAnyWhy, isManual } from "@/store/store-utils";

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
                    const { icon, hasBailOut } = fileIcon(fcnt);
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

function fileIcon(fcnt: FileUs) {
    if (fcnt.fcat) {
        return { icon: AppIconType.cat };
    }

    const hasBailOut = isAnyWhy(fcnt);

    // if (isAnyIe6(fcnt)) { // OK: but commented out ie6 for now. there are too many of them
    //     return { icon: AppIconType.ie6, hasBailOut };
    // }

    const icon =
        fcnt.stats.isWeb
            ? AppIconType.web
            : isManual(fcnt)
                ? AppIconType.man
                : AppIconType.win;
    return {
        icon,
        hasBailOut,
    };
}
