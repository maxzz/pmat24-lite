import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import { FileContent } from "@shared/ipc-types";
import { filesAtom } from "../1-files";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";

export type TreeFcntItem = {
    fcnt: FileUsAtomType;
};

export type TreeFileItem<T = {}> = Prettify<
    DataItemNavigation<DataItemCore & TreeFcntItem & T>
>;

//export const filesAtom = atom<FileContent[]>([]);       // files with reactive content and IDs

//export const filteredAtom = atom<FileContent[]>([]);    // files to show in the tree

const _treeFilesAtom = atom<TreeFileItem[]>([]);

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







// const _treeFilesAtom = atom<TreeFileItem[]>([]);

// export const treeFilesAtom = atom(
//     (get) => get(_treeFilesAtom),
//     (get, set) => {
//         const files = get(filesAtom);

//         if (!files.length) {
//             set(_treeFilesAtom, []);
//         }

//         const filesTree: TreeFileItem[] = files.map((fcntAtom) => {
//             const fcnt = get(fcntAtom);
//             return {
//                 id: fcnt.id,
//                 name: fcnt.fname,
//                 fcnt: fcntAtom,
//             };
//         });

//         console.log('return treeFiles.atom', filesTree);

//         set(_treeFilesAtom, filesTree);
//     }
// );
