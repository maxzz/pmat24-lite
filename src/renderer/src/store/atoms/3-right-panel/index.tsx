import { FileUsAtomType } from "@/store/store-types";
import { atom } from "jotai";
import { proxy } from "valtio";

// export const xmlTextAtom = atom('');

export type RightPanel = {
    selected: FileUsAtomType | null; // File list selected atom
};

export const rightPanel = proxy<RightPanel>({
    selected: null,
});
