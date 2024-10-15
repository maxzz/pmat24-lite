import { atom } from "jotai";
import { FldCatInData, FldCatOutData } from "./9-types";

export const fldCatTriggerAtom = atom<FldCatInData | null>(null);

export const doOpenFldCatDialogAtom = atom(
    null,
    (get, set, inData?: FldCatInData) => {
        set(fldCatTriggerAtom, inData ? inData : {});
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
