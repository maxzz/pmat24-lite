import { atom } from "jotai";
import { filesAtom } from "../../../1-files";
import { hasAnyManiChange } from "../../9-types";
import { doSaveOneAtom } from "../2-do-save-main-atom";

export const doSaveAllAtom = atom(null,
    (get, set) => {
        const files = get(filesAtom);

        files.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);

                if (hasAnyManiChange({ fileUs })) {
                    set(doSaveOneAtom, fileUsAtom);
                }
            }
        );
    }
);

//TODO: file save/reset from atoms
