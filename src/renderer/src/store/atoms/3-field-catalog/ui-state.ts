import { CatalogItem } from "@/store/manifest";
import { PrimitiveAtom, atom } from "jotai";

// Field catalog dialog UI state

export type FldCatInData = {
    dbid?: string | undefined;
    outBoxAtom?: PrimitiveAtom<FldCatOutData | null>;
};

export type FldCatOutData = {
    fldCatItem: CatalogItem | null;
};

export const fldCatTriggerAtom = atom<FldCatInData | null>(null);

export const openFldCatDialogAtom = atom(
    null,
    (get, set, inData?: FldCatInData) => {
        set(fldCatTriggerAtom, inData ? inData : {});
    }
);

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

export function creteOutBoxAtom<T>() {
    return atom<T | null>(null);
}
