import { atom } from "jotai";
import { type FceCtx } from "../9-types";
import { type ValueLife } from "@/store/manifest";
import { setManiChanges } from "../../3-file-mani-atoms";

export const doFcePropChangesAtom = atom(
    null,
    (get, set, { fceCtx, name, nextValue }: { fceCtx: FceCtx; name: string; nextValue: string | ValueLife; }) => {
        const selectedItem = get(fceCtx.selectedItemAtom);
        if (!selectedItem) {
            return;
        }

        switch (name) {
            case 'nameAtom': {
                const displayname = nextValue as string;
                const changed = displayname !== selectedItem.beforeEdit.displayname;

                selectedItem.fieldValue.displayname = displayname;
                setManiChanges(fceCtx.fceAtoms, changed, `name-${selectedItem.fceMeta.uuid}`);
                break;
            }
            case 'ownernoteAtom': {
                const ownernote = nextValue as string;
                const changed = ownernote !== selectedItem.beforeEdit.ownernote;

                selectedItem.fieldValue.ownernote = ownernote;
                setManiChanges(fceCtx.fceAtoms, changed, `note-${selectedItem.fceMeta.uuid}`);
                break;
            }
            case 'valueLifeAtom': {
                const { value, valueAs, isRef, isNon } = nextValue as ValueLife;
                const changed = value !== selectedItem.beforeEdit.value || valueAs !== selectedItem.beforeEdit.valueAs || isRef !== selectedItem.beforeEdit.isRef || isNon !== selectedItem.beforeEdit.isNon;

                selectedItem.fieldValue.value = value;
                selectedItem.fieldValue.valueAs = valueAs;
                selectedItem.fieldValue.isRef = isRef;
                selectedItem.fieldValue.isNon = isNon;
                setManiChanges(fceCtx.fceAtoms, changed, `life-${selectedItem.fceMeta.uuid}`);
                break;
            }
        }
    }
);
