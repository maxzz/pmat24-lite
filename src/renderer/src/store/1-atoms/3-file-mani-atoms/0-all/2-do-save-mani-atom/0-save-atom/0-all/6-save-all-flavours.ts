import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { hasFileUsAnyChanges } from "@/store/1-atoms/3-file-mani-atoms/9-types";
import { rightPanelAtom } from "@/store/1-atoms/2-right-panel";
import { filesAtom } from "@/store/1-atoms/1-files";
import { doSaveOneAtom } from "./0-all-save";

export const doSaveAsAtom = atom(null,
    (get, set, { fileUsAtom }: { fileUsAtom: FileUsAtom; }) => {

        //TODO: get new filename
        const newFilename = 'newFilename';

        const fileUs = get(fileUsAtom);

        const changed = hasFileUsAnyChanges({ fileUs });
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom, newFilename);

        console.log('saved as', fileUs.fileCnt.fname);
    }
);

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

export const doSaveRightPanelFileAtom = atom(null,
    (get, set) => {
        const fileUsAtom = get(rightPanelAtom);
        if (!fileUsAtom) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom);
    }
);
