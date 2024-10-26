import { atom, type PrimitiveAtom } from "jotai";
import { type FldCatInData, type FldCatOutData } from "./9-types";
import { type CatalogItem } from "@/store/manifest";
import { fceRoots } from "../../4-field-catalogs/2-fce-roots";
import { FceRoot } from "../../4-field-catalogs/9-types";

export const fldCatTriggerAtom = atom<FldCatInData | null>(null);

export const doOpenFldCatDialogAtom = atom(
    null,
    (get, set, { fceRoot, inData }: { fceRoot: FceRoot | undefined, inData?: Omit<FldCatInData, 'fceRoot'>; }) => {
        const root = fceRoot || fceRoots.entries['root'];
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

export type SelectedItemAtom = PrimitiveAtom<CatalogItem | null>;
