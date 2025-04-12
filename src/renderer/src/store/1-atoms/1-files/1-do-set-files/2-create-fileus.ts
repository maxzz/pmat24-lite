import { atom } from 'jotai';
import { type FileContent } from '@shared/ipc-types';
import { type FileUs, finalizeFileContent } from "@/store";
import { type ManiAtoms } from '@/store/1-atoms/2-file-mani-atoms';
import { createParsedSrc } from './4-create-parsed-src';

/**
 * 
 * @param fileContent 
 * @param masterFileUs - file for password change
 * @returns new fileUs
 */
export function createFileUsFromFileContent(fileContent: FileContent, masterFileUs?: FileUs): FileUs {
    const fileCnt: FileContent = finalizeFileContent(fileContent);

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedSrc(fileCnt, masterFileUs),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fceAtomsForFcFile: undefined,   // will be assigned later when all files are loaded
        fceAtomsRefForMani: undefined,  // will be assigned later when all files are loaded

        mainForCpassAtom: undefined,
    };

    return rv;
}
