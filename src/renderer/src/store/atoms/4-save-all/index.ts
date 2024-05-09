import { atom } from "jotai";
import { filesAtom } from "../1-files";

export const saveAllAtoms = atom(null,
    (get, set) => {
        const files = get(filesAtom);

        files.forEach(file => {
            console.log(file);
        });
    }
);

//TODO: file save/reset from atoms
