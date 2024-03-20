import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import { FileContent } from "@shared/ipc-types";
import { filesAtom } from "..";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";
import { filteredAtom } from "./4-filtered";

export type TreeFcntItem = {
    fcnt: FileUsAtomType;
};

export type TreeFileItem<T = {}> = Prettify<
    DataItemNavigation<DataItemCore & TreeFcntItem & T>
>;

//export const filteredAtom = atom<FileContent[]>([]);    // files to show in the tree

export const treeFilesAtom = atom(
    (get) => {
        const files = get(filteredAtom);

        if (!files.length) {
            console.log('return treeFiles.atom []');
            return [];
        }

        const filesTree: TreeFileItem[] = files.map((fcntAtom) => {
            const fcnt = get(fcntAtom);
            const site = fcnt.stats.domain || fcnt.fname;
            return {
                id: fcnt.id,
                name: site,
                fcnt: fcntAtom,
            };
        });

        console.log('return treeFiles.atom', filesTree);

        return filesTree;
    }
);
