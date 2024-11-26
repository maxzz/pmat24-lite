import { useEffect } from "react";
import { useAtomValue, useSetAtom, type Getter, type Setter } from "jotai";
import { type FceCtx, type FceItem } from "@/store";
import { createEmptyValueLife } from "@/store/manifest";
import { FieldTyp } from "@/store/manifest";

export function useSelectedUpdates({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);

    const { nameAtom, valueAtom, ownernoteAtom, valueLifeAtom } = fceCtx.fcePropAtoms;

    const setDisplayName = useSetAtom(nameAtom);
    const setValue = useSetAtom(valueAtom);
    const setOwnernote = useSetAtom(ownernoteAtom);
    const setValueLife = useSetAtom(valueLifeAtom);

    useEffect(
        () => {
            setDisplayName(selectedItem?.fieldValue.displayname || '');
            setValue(selectedItem?.fieldValue.value || '');
            setOwnernote(selectedItem?.fieldValue.ownernote || '');
            setValueLife(selectedItem?.fieldValue || createEmptyValueLife({ fType: FieldTyp.edit }));
        }, [selectedItem]
    );
}

const emptyValueLife = createEmptyValueLife({ fType: FieldTyp.edit });

export function setSelectedProps({ fceCtx, selectedItem, get, set }: { fceCtx: FceCtx; selectedItem: FceItem; get: Getter; set: Setter; }) {
    //const selectedItem = get(fceCtx.selectedItemAtom);

    const { nameAtom, valueAtom, ownernoteAtom, valueLifeAtom } = fceCtx.fcePropAtoms;

    set(nameAtom, selectedItem?.fieldValue.displayname || '');
    set(valueAtom, selectedItem?.fieldValue.value || '');
    set(ownernoteAtom, selectedItem?.fieldValue.ownernote || '');
    set(valueLifeAtom, selectedItem?.fieldValue || emptyValueLife);
}
