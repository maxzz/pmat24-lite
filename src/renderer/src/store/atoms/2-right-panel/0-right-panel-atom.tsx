import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";

export const rightPanelAtom = atom<FileUsAtomType | null | undefined>(null)

export const rightPanelSelectedContentAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : null;
    },
);
