import { atom } from "jotai";
import { filesContentAtom } from "../1-atom-dropped-files";
import { FileContent } from "@shared/ipc-types";
import { DataItem } from "@/ui/shadcn/tree";

export type TreeFileItem =
    & DataItem
    & {
        fcnt: FileContent;
    };

export const treeFilesAtom = atom<TreeFileItem[]>(
    (get) => {
        const files = get(filesContentAtom);

        console.log('treeFiles.atom', files);

        if (!files.length) {
            return [];
        }

        const filesTree: TreeFileItem[] = files.map((fcnt) => {
            return {
                id: fcnt.id,
                name: fcnt.name,
                fcnt,
            };
        });

        return filesTree;
    }
);
