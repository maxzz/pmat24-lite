import { atom } from "jotai";
import { type FceCtx } from "../../9-types";
import { type ValueLife } from "@/store/manifest";
import { setManiChanges } from "../../../3-file-mani-atoms";
import { theSameValue } from "../../../3-file-mani-atoms/1-normal-fields/1-field-items/0-conv/4-comparison";

export const doFcePropChangesAtom = atom(
    null,
    (get, set, { fceCtx, name, nextValue }: { fceCtx: FceCtx; name: string; nextValue: string | ValueLife; }) => {
        const selectedItem = get(fceCtx.selectedItemAtom);
        if (!selectedItem) {
            return;
        }

        const beforeEdit = selectedItem.beforeEdit;
        const uuid = selectedItem.fceMeta.uuid;

        switch (name) {
            case 'nameAtom': {
                const displayname = nextValue as string;
                const changed = displayname !== beforeEdit.displayname;

                selectedItem.fieldValue.displayname = displayname;
                setManiChanges(fceCtx.fceAtoms, changed, `name-${uuid}`);
                break;
            }
            case 'ownernoteAtom': {
                const ownernote = nextValue as string;
                const changed = ownernote !== beforeEdit.ownernote;

                selectedItem.fieldValue.ownernote = ownernote;
                setManiChanges(fceCtx.fceAtoms, changed, `note-${uuid}`);
                break;
            }
            case 'valueLifeAtom': {
                const { value, valueAs, isRef, isNon } = nextValue as ValueLife;
                const changed = !theSameValue(nextValue as ValueLife, beforeEdit);
                // console.log('doFcePropChangesAtom', JSON.stringify({ changed, nextValue, current: selectedItem.fieldValue }, null, 2));

                selectedItem.fieldValue.value = value;
                selectedItem.fieldValue.valueAs = valueAs;
                selectedItem.fieldValue.isRef = isRef;
                selectedItem.fieldValue.isNon = isNon;
                setManiChanges(fceCtx.fceAtoms, changed, `life-${uuid}`);
                break;
            }
        }
    }
);
