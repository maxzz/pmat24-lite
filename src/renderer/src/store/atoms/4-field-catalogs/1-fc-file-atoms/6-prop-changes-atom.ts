import { atom } from "jotai";
import { type FceCtx } from "../9-types";
import { type ValueLife } from "@/store/manifest";

export const doFcePropChangesAtom = atom(
    null,
    (get, set, { fceCtx, name, nextValue }: { fceCtx: FceCtx; name: string; nextValue: string | ValueLife; }) => {
        const selectedItem = get(fceCtx.selectedItemAtom);
        if (!selectedItem) {
            return;
        }

        const changesSet = fceCtx.fceAtoms.fileUs.fileCnt.changesSet;

        switch (name) {
            case 'nameAtom': {
                const displayname = nextValue as string;
                selectedItem.fieldValue.displayname = displayname;
                
                const changed = displayname !== selectedItem.beforeEdit.displayname;
                if (changed) {
                    changesSet.add(`name-${selectedItem.fceMeta.uuid}`);
                } else {
                    changesSet.delete(`name-${selectedItem.fceMeta.uuid}`);
                }

                break;
            }
            case 'ownernoteAtom': {
                const ownernote = nextValue as string;
                selectedItem.fieldValue.ownernote = ownernote;

                const changed = ownernote !== selectedItem.beforeEdit.ownernote;
                if (changed) {
                    changesSet.add(`note-${selectedItem.fceMeta.uuid}`);
                } else {
                    changesSet.delete(`note-${selectedItem.fceMeta.uuid}`);
                }

                break;
            }
            case 'valueLifeAtom': {
                //console.log('doFcePropChangesAtom', { name, nextValue, fceCtx });

                const { value, valueAs, isRef, isNon } = nextValue as ValueLife;
                selectedItem.fieldValue.value = value;
                selectedItem.fieldValue.valueAs = valueAs;
                selectedItem.fieldValue.isRef = isRef;
                selectedItem.fieldValue.isNon = isNon;

                const changed = value !== selectedItem.beforeEdit.value || valueAs !== selectedItem.beforeEdit.valueAs || isRef !== selectedItem.beforeEdit.isRef || isNon !== selectedItem.beforeEdit.isNon;
                if (changed) {
                    changesSet.add(`life-${selectedItem.fceMeta.uuid}`);
                } else {
                    changesSet.delete(`life-${selectedItem.fceMeta.uuid}`);
                }

                break;
            }
        }

        console.log('doFcePropChangesAtom changesSet', changesSet);
    }
);
