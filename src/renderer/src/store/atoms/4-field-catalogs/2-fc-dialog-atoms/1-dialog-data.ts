import { atom, type PrimitiveAtom } from "jotai";
import { type FceDlgIn, type FceDlgOut } from "../9-types/3-types-dlg";
import { type FceItem, type FceAtoms, type FceCtx } from "../9-types/1-types-fce-atoms";
import { createFceCtx, getRootFceAtoms } from "../1-fc-file-atoms";

export const fceDlgTriggerAtom = atom<FceCtx | null>(null);

export const doOpenFldCatDialogAtom = atom(
    null,
    (get, set, { fceAtoms = getRootFceAtoms(), inData }: { fceAtoms?: FceAtoms; inData?: FceDlgIn; }) => {
        const closeFldCatDialog = (outData: any) => { };
        const fceCtx = createFceCtx({ fceAtoms, inData, closeFldCatDialog });
        set(fceDlgTriggerAtom, fceCtx);
    }
);

export const doCancelFldCatDialogAtom = atom(
    null,
    (get, set) => {
        set(fceDlgTriggerAtom, null);
    }
);

export const doCloseFldCatDialogAtom = atom(
    null,
    (get, set, outData: FceDlgOut) => {
        const inData = get(fceDlgTriggerAtom)?.inData;

        const outBox = inData?.outBoxAtom;
        if (outBox) {
            set(outBox, outData);
        }

        inData && set(fceDlgTriggerAtom, null);
    }
);

// atom to store result of the field catalog dialog

export function creteOutBoxAtom<T>() {
    return atom<T | null>(null);
}

// Selected item atom

export type SelectedItemAtom = PrimitiveAtom<FceItem | null>;
