import { FileUsAtomType } from "@/store/store-types";
import { atom } from "jotai";
import { proxy, subscribe } from "valtio";

// export const xmlTextAtom = atom('');

export type RightPanel = {
    selected: FileUsAtomType | null; // File list selected atom
};

export const rightPanel = proxy<RightPanel>({
    selected: null,
});

subscribe(rightPanel, () => {
    console.log('---------------rightPanel.selected', rightPanel.selected);
});

export const rightPanelSelectedAtom = atom(
    (get) => {
        console.log('>>>>>>>>>>>>>>>> rightPanelSelectedAtom', rightPanel.selected);

        const selected = rightPanel.selected;
        if (!selected) {
            return selected;
        }
        return get(selected);
    },
);


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
