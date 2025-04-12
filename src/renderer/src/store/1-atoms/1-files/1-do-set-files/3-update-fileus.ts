import { type Getter, type Setter, atom } from "jotai";
import { type FileUsAtom, type FileUs, discardFileUsManiAtoms, createManiAtoms } from '@/store';
import { createParsedSrc } from './4-create-parsed-src';

export const updateFileUsAfterSaveOrResetAtom = atom(null,
    (get, set, { fileUsAtom, reset }: { fileUsAtom: FileUsAtom; reset: boolean; }) => {
        const fileUs = get(fileUsAtom);

        if (fileUs.parsedSrc.fcat) {
            console.log('no update for FC');
            return;
        }

        updateFileUsAfterSaveOrReset(fileUsAtom, fileUs, reset, get, set);
    }
);

function updateFileUsAfterSaveOrReset(fileUsAtom: FileUsAtom, fileUs: FileUs, reset: boolean, get: Getter, set: Setter) {
    if (reset) {
        fileUs.parsedSrc = createParsedSrc({ fileCnt: fileUs.fileCnt, masterFileUs: undefined });
    }

    discardFileUsManiAtoms(fileUs, get, set);

    set(fileUs.maniAtomsAtom, createManiAtoms({ fileUs, fileUsAtom }));
}
