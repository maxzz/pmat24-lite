import { atom } from "jotai";
import { FileContent } from "@shared/ipc-types";
import { deliveredAtom } from "../0-content/any-delivered";
import { DataItemCore, DataItemNavigation, ItemState } from "@/ui/shadcn/tree";
import { uuid } from "@/utils";
import { xmlTextAtom } from "../3-right-panel";

export type TreeFcntItem = {
    fcnt: FileContent;
};

export type TreeFileItem<T = {}> = Prettify<
    DataItemNavigation<DataItemCore & TreeFcntItem & T>
>;

export const filesAtom = atom<FileContent[]>([]);       // files with reactive content and IDs

export const filteredAtom = atom<FileContent[]>([]);    // files to show in the tree


export const treeFilesAtom = atom<TreeFileItem[]>(
    (get) => {
        const files = get(deliveredAtom);

        console.log('treeFiles.atom', files);

        if (!files.length) {
            return [];
        }

        const filesTree: TreeFileItem[] = files.map((fcnt) => {
            return {
                id: fcnt.id || uuid.asRelativeNumber(),
                name: fcnt.name,
                fcnt,
            };
        });

        return filesTree;
    }
);

export const doClearFileContentAtom = atom(
    null,
    (get, set) => {
        set(deliveredAtom, []);
        set(xmlTextAtom, '');
    }
);