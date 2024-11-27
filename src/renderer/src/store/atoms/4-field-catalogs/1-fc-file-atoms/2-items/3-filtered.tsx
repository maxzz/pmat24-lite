import { atom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type FceCtx } from "../../9-types";

export const filteredItemsAtom = atom(
    (get) => (fceCtx: FceCtx) => {
        const all = get(fceCtx.fceAtoms.allAtom);
        const rv = all.filter((item) => item.fieldValue.fType === FieldTyp.edit);
        return rv;
    }
);
