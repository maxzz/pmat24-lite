import { type PrimitiveAtom, atom } from 'jotai';
import { type FileContent } from '@shared/ipc-types';
import { type FileUs, finalizeFileContent } from "@/store";
import { type ManiAtoms } from '@/store/1-atoms/2-file-mani-atoms';
import { createParsedSrc } from './4-create-parsed-src';

/**
 * 
 * @param fileContent 
 * @param maniForCpass - file for password change
 * @returns new fileUs
 */
export function createFileUsFromFileContent(fileContent: FileContent, maniForCpass?: FileUs): FileUs {
    const fileCnt: FileContent = finalizeFileContent(fileContent);

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedSrc({ fileCnt, maniForCpass }),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: createManiAtomsTraceAtom(null),

        fceAtomsForFcFile: undefined,   // will be assigned later when all files are loaded
        fceAtomsRefForMani: undefined,  // will be assigned later when all files are loaded

        mainForCpassAtom: undefined,
        rawCpassAtom: atom<string | undefined>(undefined),
    };

    return rv;
}

/**
 * For non-debug version return: atom<ManiAtoms | null>(null)
 */
export function createManiAtomsTraceAtom(initial: ManiAtoms | null): PrimitiveAtom<ManiAtoms | null> {
    const base = atom<ManiAtoms | null>(initial);
    printBaseManiAtomsCreated(base);

    const rv = atom(
        (get) => {
            const rv = get(base);
            return rv;
        },
        (get, set, value: SetStateAction<ManiAtoms | null>) => {
            printManiAtomsSet(base, value ? typeof value === 'function' ? value(get(base)) : value : null);
            set(base, value);
        }
    );

    return rv;
}

function printBaseManiAtomsCreated(maniAtomsAtom: PrimitiveAtom<ManiAtoms | null>) {
    console.groupCollapsed(
        `%c 🛠 created.maniAtoms.base: %c ${maniAtomsAtom.toString()}%c`,
        'font-weight: normal; background-color: darkcyan; color: lavender',
        'font-weight: normal; color: darkmagenta',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}

function printManiAtomsSet(maniAtomsAtom: PrimitiveAtom<ManiAtoms | null>, maniAtoms: ManiAtoms | null) {
    console.groupCollapsed(
        `%c 🛠 set.maniAtoms: %c ${maniAtomsAtom.toString()}%c`,
        'font-weight: normal; background-color: darkcyan; color: lavender',
        'font-weight: normal; color: darkmagenta',
        'font-weight: normal; color: gray',
        { maniAtoms }
    );
    console.trace();
    console.groupEnd();
}
