import { PrimitiveAtom, atom } from "jotai";
import { CatalogItem } from "@/store/manifest";

// Field catalog dialog in data

export type FldCatInData = {
    dbid?: string | undefined;
    outBoxAtom?: PrimitiveAtom<FldCatOutData | null>;
};

export const fldCatTriggerAtom = atom<FldCatInData | null>(null);

export const openFldCatDialogAtom = atom(
    null,
    (get, set, inData?: FldCatInData) => {
        set(fldCatTriggerAtom, inData ? inData : {});
    }
);

// Field catalog dialog output data

export type FldCatOutData = {
    fldCatItem: CatalogItem | null; // selected item
};

export const closeFldCatDialogAtom = atom(
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
