import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";
import { FileContent } from "@shared/ipc-types";
import { doSetDeliveredFilesAtom, files2Atom } from "../1-files";
import { rightPanelAtom } from "../3-right-panel";
import { DataItemCore, DataItemNavigation } from "@/ui/shadcn/tree";

export type TreeFcntItem = {
    fcnt: FileUsAtomType;
};

export type TreeFileItem<T = {}> = Prettify<
    DataItemNavigation<DataItemCore & TreeFcntItem & T>
>;

//export const filesAtom = atom<FileContent[]>([]);       // files with reactive content and IDs

export const filteredAtom = atom<FileContent[]>([]);    // files to show in the tree

const _treeFilesAtom = atom<TreeFileItem[]>([]);

export const treeFilesAtom = atom(
    (get) => get(_treeFilesAtom),
    (get, set) => {
        const files = get(files2Atom);

        if (!files.length) {
            set(_treeFilesAtom, []);
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

        set(_treeFilesAtom, filesTree);
    }
);

export const doClearFileContentAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, []);
        set(rightPanelAtom, null);
    }
);
