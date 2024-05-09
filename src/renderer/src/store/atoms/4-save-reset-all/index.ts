import { atom } from "jotai";
import { filesAtom } from "../1-files";
import { doSaveOneAtom } from "../3-file-mani-atoms/8-save-reset-one";

export const doSaveAllAtom = atom(null,
    (get, set) => {
        const files = get(filesAtom);

        files.forEach((fileUsAtom) => {
            const fileUs = get(fileUsAtom);

            const changed = !!fileUs.changesSet.size;
            if (!changed) {
                return;
            }

            set(doSaveOneAtom, fileUsAtom);

            console.log('saved', fileUs.fname);
        });
    }
);

//TODO: file save/reset from atoms
