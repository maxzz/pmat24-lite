import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { rightPanelAtomAtom } from "@/store/5-right-panel";
import { filesAtom } from "@/store/5-files";
import { doSaveOneAtom } from "./1-do-save-one";

export const doSaveRightPanelFileAtom = atom(null,
    (get, set) => {
        const fileUsAtom = get(rightPanelAtomAtom);
        if (!fileUsAtom) {
            return;
        }

        set(doSaveOneAtom, { fileUsAtom });
    }
);

export const doSaveAllAtom = atom(null,
    (get, set) => {
        const files = get(filesAtom);

        files.forEach(
            (fileUsAtom) => {
                set(doSaveOneAtom, { fileUsAtom });
            }
        );
    }
);

export const doSaveAsAtom = atom(null,
    (get, set, { fileUsAtom }: { fileUsAtom: FileUsAtom; }) => {
        //TODO: get new filename
        const newFilename = 'newFilename';

        set(doSaveOneAtom, { fileUsAtom, newFilename });
    }
);
