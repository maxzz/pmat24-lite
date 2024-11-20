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

        switch (name) {
            case 'nameAtom': {
                selectedItem.fieldValue.displayname = nextValue as string;
                break;
            }
            case 'ownernoteAtom': {
                const ownernote = nextValue as string;
                selectedItem.fieldValue.ownernote = ownernote;
                break;
            }
            case 'valueLifeAtom': {
                console.log('doFcePropChangesAtom', { name, nextValue, fceCtx });

                const { value, valueAs, isRef, isNon } = nextValue as ValueLife;
                selectedItem.fieldValue.value = value;
                selectedItem.fieldValue.valueAs = valueAs;
                selectedItem.fieldValue.isRef = isRef;
                selectedItem.fieldValue.isNon = isNon;
                break;
            }
        }
    }
);
