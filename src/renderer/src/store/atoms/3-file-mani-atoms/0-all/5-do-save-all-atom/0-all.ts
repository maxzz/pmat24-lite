import { atom } from "jotai";
import { filesAtom } from "../../../1-files";
import { doSaveOneAtom } from "../2-do-save-main-atom";

export const doSaveAllAtom = atom(null,
    (get, set) => {
        const files = get(filesAtom);

        files.forEach((fileUsAtom) => {
            const fileUs = get(fileUsAtom);

            const changed = !!fileUs.fileCnt.changesSet.size;
            if (!changed) {
                return;
            }

            set(doSaveOneAtom, fileUsAtom);
        });
    }
);

//TODO: file save/reset from atoms
