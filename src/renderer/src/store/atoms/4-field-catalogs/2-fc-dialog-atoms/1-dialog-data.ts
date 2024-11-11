import { atom, type PrimitiveAtom } from "jotai";
import { type FceDlgIn, type FceDlgOut } from "../9-types/3-types-dlg";
import { type FceItem, type FceAtoms, type FceCtx, type OnChangeFcePropValue } from "../9-types/1-types-fce-atoms";
import { createFceCtx, getRootFceAtoms } from "../1-fc-file-atoms";
import { doFcePropChangesAtom } from "../1-fc-file-atoms/4-prop-changes-atom";

export const fceDlgTriggerAtom = atom<FceCtx | null>(null);

export const doOpenFceDlgAtom = atom(
    null,
    (get, set, { fceAtoms = getRootFceAtoms(), inData }: { fceAtoms?: FceAtoms; inData?: FceDlgIn; }) => { //TODO: not good to use getRootFceAtoms() here it will throw error if fceAtoms is not provided
        
        const closeFldCatDialog = (outData: any) => { };
        
        const onChangeFcePropValue: OnChangeFcePropValue = (...params) => {
            console.log('onChangeFcePropValue dlg', params);
        
            const { fceCtx, name,  nextValue, set } = params[0];
            set(doFcePropChangesAtom, { fceCtx, name, nextValue });
        };
    
        const fceCtx = createFceCtx({ fceAtoms, inData, closeFldCatDialog, onChangeFcePropValue });
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

// atom to store result of the field catalog dialog

export function creteOutBoxAtom<T>() {
    return atom<T | null>(null);
}

// Selected item atom

export type SelectedItemAtom = PrimitiveAtom<FceItem | null>;
