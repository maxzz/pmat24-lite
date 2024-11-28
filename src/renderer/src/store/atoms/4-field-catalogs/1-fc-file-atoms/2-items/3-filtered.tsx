import { atom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type FceFilterOptions, type FceCtx } from "../../9-types";

export function createEmptyFceFilterOptions(): FceFilterOptions {
    return {
        search: '',
        showText: true,
        showPassword: true,
        ascending: undefined,
    };
}

export const filteredItemsAtom = atom(
    (get) => (fceCtx: FceCtx) => {
        const all = get(fceCtx.fceAtoms.allAtom);
        const rv = all.filter((item) => item.fieldValue.fType === FieldTyp.edit);
        return rv;
    }
);
