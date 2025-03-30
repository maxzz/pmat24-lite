import { atom } from "jotai";
import { filesAtom } from "../../../1-files";
import { hasFileUsAnyChanges } from "../../9-types";
import { doSaveOneAtom } from "../2-do-save-mani-atom";

export const doSaveAllAtom = atom(null,
    (get, set) => {
        const files = get(filesAtom);

        files.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);

                if (hasFileUsAnyChanges({ fileUs })) {
                    set(doSaveOneAtom, fileUsAtom);
                }
            }
        );
    }
);

//TODO: file save/reset from atoms
