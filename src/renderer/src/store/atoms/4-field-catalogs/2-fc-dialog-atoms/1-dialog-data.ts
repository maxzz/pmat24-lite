import { atom, type PrimitiveAtom } from "jotai";
import { type FldCatInData, type FldCatOutData } from "./9-types-dlg";
import { type FceItem, type FceRoot } from "../9-types-fc";
import { fceRoots } from "../1-fc-file-atoms";

export const fldCatTriggerAtom = atom<FldCatInData | null>(null);

export const doOpenFldCatDialogAtom = atom(
    null,
    (get, set, { fceRoot, inData }: { fceRoot: FceRoot | undefined, inData?: Omit<FldCatInData, 'fceRoot'>; }) => {
        const root = fceRoot || fceRoots.entries['root']; //TODO: get shortest path instead of 'root'
        const data: FldCatInData =
            inData
                ? {
                    ...inData,
                    fceRoot: root,
                }
                : {
                    fceRoot: root,
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
    (get, set, outData: FldCatOutData) => {
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
