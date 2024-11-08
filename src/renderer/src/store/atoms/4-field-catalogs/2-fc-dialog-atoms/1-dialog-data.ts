import { atom, type PrimitiveAtom } from "jotai";
import { type Fce0InData, type Fce0OutData } from "../9-types/3-types-dlg";
import { type FceItem, type Fce0Atoms } from "../9-types/1-types-fce-atoms";
import { fceRoots } from "../1-fc-file-atoms";

export const fldCatTriggerAtom = atom<Fce0InData | null>(null);

export const doOpenFldCatDialogAtom = atom(
    null,
    (get, set, { fceRoot, inData }: { fceRoot: Fce0Atoms | undefined, inData?: Omit<Fce0InData, 'fceAtoms'>; }) => {
        const root = fceRoot || fceRoots.entries['root']; //TODO: get shortest path instead of 'root'
        const data: Fce0InData =
            inData
                ? {
                    ...inData,
                    fceAtoms: root,
                }
                : {
                    fceAtoms: root,
                    showTxt: true,
                    showPsw: true,
                };
        set(fldCatTriggerAtom, data);
    }
);

export const doCancelFldCatDialogAtom = atom(
    null,
    (get, set) => {
        set(fldCatTriggerAtom, null);
    }
);

export const doCloseFldCatDialogAtom = atom(
    null,
    (get, set, outData: Fce0OutData) => {
        const inData = get(fldCatTriggerAtom);

        const outBox = inData?.outBoxAtom;
        if (outBox) {
            set(outBox, outData);
        }

        inData && set(fldCatTriggerAtom, null);
    }
);

// atom to store result of the field catalog dialog

export function creteOutBoxAtom<T>() {
    return atom<T | null>(null);
}

// Selected item atom

export type SelectedItemAtom = PrimitiveAtom<FceItem | null>;
