import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import { FileContent } from "@shared/ipc-types";
import { filesAtom } from "..";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";

export type TreeFcntItem = {
    fcnt: FileUsAtomType;
};

export type TreeFileItem<T = {}> = Prettify<
    DataItemNavigation<DataItemCore & TreeFcntItem & T>
>;

//export const filteredAtom = atom<FileContent[]>([]);    // files to show in the tree

export const treeFilesAtom = atom(
    (get) => {
        const files = get(filesAtom);

        if (!files.length) {
            console.log('return treeFiles.atom []');
            return [];
        }

        const filesTree: TreeFileItem[] = files.map((fcntAtom) => {
            const fcnt = get(fcntAtom);
            return {
                id: fcnt.id,
                name: fcnt.fname,
                fcnt: fcntAtom,
            };
        });

        console.log('return treeFiles.atom', filesTree);

        return filesTree;
    }
);
