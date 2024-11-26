import { type Getter, type Setter } from "jotai";
import { type FceCtx, type FceItem } from "@/store";
import { createEmptyValueLife } from "@/store/manifest";
import { FieldTyp } from "@/store/manifest";

const emptyValueLife = createEmptyValueLife({ fType: FieldTyp.edit }); // This should be changed since it is hidden

export function setSelectedProps({ fceCtx, selectedItem, get, set }: { fceCtx: FceCtx; selectedItem: FceItem; get: Getter; set: Setter; }) {
    const { nameAtom, valueAtom, ownernoteAtom, valueLifeAtom } = fceCtx.fcePropAtoms;

    set(nameAtom, selectedItem?.fieldValue.displayname || '');
    set(valueAtom, selectedItem?.fieldValue.value || '');
    set(ownernoteAtom, selectedItem?.fieldValue.ownernote || '');
    set(valueLifeAtom, selectedItem?.fieldValue || emptyValueLife);
}
