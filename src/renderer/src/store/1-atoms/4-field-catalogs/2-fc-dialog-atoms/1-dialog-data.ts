import { atom, type PrimitiveAtom } from "jotai";
import { type FceDlgIn, type FceDlgOut } from "../9-types/3-types-dlg";
import { type FceItem, type FceAtoms, type FceCtx } from "../9-types/1-types-fce-atoms";
import { createFceCtx, getRootFceAtoms } from "../1-fc-file-atoms";

export const fceDlgTriggerAtom = atom<FceCtx | null>(null);

export const doOpenFceDlgAtom = atom(
    null,
    (get, set, { fceAtoms, inData }: { fceAtoms?: FceAtoms | undefined; inData?: FceDlgIn; }) => {
        fceAtoms = fceAtoms || getRootFceAtoms(); //TODO: not good to use getRootFceAtoms() here it will throw error if fceAtoms is not provided

        function closeFldCatDialog(outData: FceDlgOut) {
            set(doCloseFceDlgAtom, outData);
        }

        const fceCtx = createFceCtx({ fceAtoms, inData, closeFldCatDialog });
        set(fceDlgTriggerAtom, fceCtx);
    }
);

export const doCancelFceDlgAtom = atom(
    null,
    (get, set) => {
        set(fceDlgTriggerAtom, null);
    }
);

export const doCloseFceDlgAtom = atom(
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

/**
 * Atom to store result of the field catalog dialog
 */
export function creteOutBoxAtom<T>() {
    return atom<T | null>(null);
}

/**
 * TType of atom to store selected item from the field catalog picker dialog
 */
export type SelectedItemAtom = PrimitiveAtom<FceItem | null>;
