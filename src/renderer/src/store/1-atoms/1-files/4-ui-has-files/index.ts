import { atom } from "jotai";
import { filesAtom } from '../0-files-atom';

// UI has files

export const hasFilesAtom = atom(
    (get) => {
        const total = get(filesAtom);
        return !!total.length;
    }
);
