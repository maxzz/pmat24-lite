import { type Atomize, type OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { type SubmitFields } from "./9-types";

export function createAtoms(initialState: SubmitFields.ForAtoms, onChange: OnValueChangeAny): Atomize<SubmitFields.ForAtoms> {
    const { buttonNameItems, selected, doSubmit, isSubmitTypeUndefined } = initialState;

    const rv: Atomize<SubmitFields.ForAtoms> = {
        buttonNameItemsAtom: atomWithCallback(buttonNameItems, onChange),
        selectedAtom: atomWithCallback(selected, onChange),
        doSubmitAtom: atomWithCallback(doSubmit, onChange),
        isSubmitTypeUndefinedAtom: atomWithCallback(isSubmitTypeUndefined, onChange),
    };
    
    return rv;
}
