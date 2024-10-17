import { atom, type PrimitiveAtom } from "jotai";
import { type FldCatInData, type FldCatOutData } from "./9-types";
import { type CatalogItem } from "@/store/manifest";

export const fldCatTriggerAtom = atom<FldCatInData | null>(null);

export const doOpenFldCatDialogAtom = atom(
    null,
    (get, set, inData?: FldCatInData) => {
        set(fldCatTriggerAtom, inData ? inData : {showTxt: true, showPsw: true});
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

export type SelectedItemAtom = PrimitiveAtom<CatalogItem | null>;
