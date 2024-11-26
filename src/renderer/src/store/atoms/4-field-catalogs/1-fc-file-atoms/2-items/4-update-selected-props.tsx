import type { FceCtx } from "@/store";
import { createEmptyValueLife } from "@/store/manifest";
import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp } from "pm-manifest";
import { useEffect } from "react";

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
