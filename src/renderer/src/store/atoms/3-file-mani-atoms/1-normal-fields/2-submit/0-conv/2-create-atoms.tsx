import { type Atomize, type OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { type SubmitConvTypes } from "./9-types";

export function createAtoms(initialState: SubmitConvTypes.SubmitForAtoms, onChange: OnValueChangeAny): Atomize<SubmitConvTypes.SubmitForAtoms> {
    const { buttonNameItems, selected, doSubmit, isSubmitTypeUndefined: isDoSubmitUndefined } = initialState;

    const rv: Atomize<SubmitConvTypes.SubmitForAtoms> = {
        buttonNameItemsAtom: atomWithCallback(buttonNameItems, onChange),
        selectedAtom: atomWithCallback(selected, onChange),
        doSubmitAtom: atomWithCallback(doSubmit, onChange),
        isDoSubmitUndefinedAtom: atomWithCallback(isDoSubmitUndefined, onChange),
    };
    
    return rv;
}
