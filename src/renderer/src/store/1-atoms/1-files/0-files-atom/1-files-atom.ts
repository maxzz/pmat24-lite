import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

// UI has files

const hasFilesAtom = atom(
    (get) => {
        const total = get(filesAtom);
        return !!total.length;
    }
);
