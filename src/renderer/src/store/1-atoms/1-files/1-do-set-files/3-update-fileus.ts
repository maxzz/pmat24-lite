import { atom } from 'jotai';
import { type FileUsAtom, type FileUs } from '@/store';
import { createParsedSrc } from './4-create-parsed-src';

export const updateFileUsAfterSaveOrResetAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        if (fileUs.parsedSrc.fcat) {
            console.log('no update for FC');
            return;
        }

        updateFileUsAfterSaveOrReset(fileUs);
    }
);

function updateFileUsAfterSaveOrReset(fileUs: FileUs) {
    fileUs.parsedSrc = createParsedSrc(fileUs.fileCnt, undefined);
    //dispose maniAtoms
    //create maniAtoms
    //parse xml and so on...
}
