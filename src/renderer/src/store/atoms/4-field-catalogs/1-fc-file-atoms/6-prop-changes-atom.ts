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

        //console.log('doFcePropChangesAtom', { name, nextValue, fceCtx });

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
                {
                //     selectedItem.fieldValue = nextValue as ValueLife
                //     const { fType, valueAs } = nextValue as ValueLife;

                //     valueAs: ValueAs;           // how to treat value from user
                //     value?: string;             // key in 'references' if started with '@' otherwise it's a constant value
                //     isRef?: boolean;            // true if value started with '@' but not '@@'
                
                //     fType: FieldTyp;            // now it has type psw and edit/psw/rest information
                
                //    //isPsw?: boolean;           // it comes from field.password, and not from ref @password (ref should reflect field type not opposite).
                //    //isBtn?: boolean;           // any type but not edit or password
                //     isNon?: boolean;            // true when value is empty and valueAs is default AskReuse, but input cleared by user
                
                //     selectedItem.fieldValue.password = fType === FieldTyp.psw;
                //     selectedItem.fieldValue.valueAs = valueAs;
                //     selectedItem.fieldValue.value = nextValue.value;
                }
                break;
            default:
                throw new Error(`Unknown prop name: ${name}`);
        }
    }
);
