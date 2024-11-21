import { atom } from "jotai";
import { type FceCtx } from "../9-types";
import { type ValueLife } from "@/store/manifest";
import { setManiChanges } from "../../3-file-mani-atoms";
import { theSameValue } from "../../3-file-mani-atoms/1-normal-fields/1-field-items/0-conv/4-comparison";

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

                const changed = !theSameValue(nextValue as ValueLife, selectedItem.fieldValue);

                console.log('doFcePropChangesAtom', JSON.stringify({ nextValue, current: selectedItem.fieldValue, changed }, null, 2));

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
