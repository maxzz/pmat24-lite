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

        console.log('doFcePropChangesAtom', { name, nextValue, fceCtx });

        switch (name) {
            case 'nameAtom':
                selectedItem.fieldValue.displayname = nextValue as string;
                // set(fcePropAtoms.nameAtom, nextValue);
                break;
            case 'typeAtom':
                // set(fcePropAtoms.typeAtom, nextValue);
                break;
            case 'valueAtom':
                // set(fcePropAtoms.valueAtom, nextValue);
                break;
            case 'ownernoteAtom':
                // set(fcePropAtoms.ownernoteAtom, nextValue);
                break;
            case 'useItAtom':
                // set(fcePropAtoms.useItAtom, nextValue);
                break;
            case 'valueLifeAtom':
                // set(fcePropAtoms.valueLifeAtom, nextValue);
                break;
            default:
                throw new Error(`Unknown prop name: ${name}`);
        }
    }
);
