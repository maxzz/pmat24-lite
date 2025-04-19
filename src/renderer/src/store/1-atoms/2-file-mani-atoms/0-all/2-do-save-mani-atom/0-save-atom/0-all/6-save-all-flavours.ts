import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { rightPanelAtom } from "@/store/1-atoms/3-right-panel";
import { filesAtom } from "@/store/1-atoms/1-files";
import { doSaveOneAtom } from "./0-all-save-one";

export const doSaveRightPanelFileAtom = atom(null,
    (get, set) => {
        const fileUsAtom = get(rightPanelAtom);
        if (!fileUsAtom) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom);
    }
);

export const doSaveAllAtom = atom(null,
    (get, set) => {
        const files = get(filesAtom);

        files.forEach(
            (fileUsAtom) => {
                set(doSaveOneAtom, fileUsAtom);
            }
        );
    }
);

export const doSaveAsAtom = atom(null,
    (get, set, { fileUsAtom }: { fileUsAtom: FileUsAtom; }) => {
        //TODO: get new filename
        const newFilename = 'newFilename';

        set(doSaveOneAtom, fileUsAtom, newFilename);
    }
);
