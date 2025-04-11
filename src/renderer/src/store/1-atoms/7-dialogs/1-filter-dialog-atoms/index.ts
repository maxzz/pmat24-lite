import { atom } from "jotai";
import { doUpdateTreeSelectedByRightPanelAtom } from "@/components/2-main/1-left/2-files-list";

const _filterDialogOpenAtom = atom(false);

export const filterDialogOpenAtom = atom(
    (get) => {
        const isOpen = get(_filterDialogOpenAtom);
        return isOpen;
    },
    (_get, set, isOpen: boolean) => {
        console.log(`filterDialogOpenAtom ${isOpen ? 'open' : 'close'}`);
        
        !isOpen && setTimeout(() => set(doUpdateTreeSelectedByRightPanelAtom), 500); // Trigger when we close the filter dialog
        set(_filterDialogOpenAtom, isOpen);
    }
);
