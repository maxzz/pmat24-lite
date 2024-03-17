import { FileUsAtomType } from "@/store/store-types";
import { atom } from "jotai";

export const rPanelSelectedAtom = atom<FileUsAtomType | null>(null)

export const rPanelSelectedContentAtom = atom(
    (get) => {
        console.log('<<<<<<<<<<<<<< rightPanelSelectedAtom');

        const selected = get(rPanelSelectedAtom);
        if (!selected) {
            return selected;
        }

        return get(selected);
    },
);
