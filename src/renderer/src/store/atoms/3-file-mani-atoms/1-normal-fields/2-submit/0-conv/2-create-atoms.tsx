import { type Atomize, type OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { type SubmitConvTypes } from "./9-types";

export function createAtoms(initialState: SubmitConvTypes.SubmitForAtoms, onChange: OnValueChangeAny): Atomize<SubmitConvTypes.SubmitForAtoms> {
    const { buttonNames, selected, doSubmit, isDoSubmitUndefined } = initialState;

    const rv: Atomize<SubmitConvTypes.SubmitForAtoms> = {
        buttonNamesAtom: atomWithCallback(buttonNames, onChange),
        selectedAtom: atomWithCallback(selected, onChange),
        doSubmitAtom: atomWithCallback(doSubmit, onChange),
        isDoSubmitUndefinedAtom: atomWithCallback(isDoSubmitUndefined, onChange),
    };
    
    return rv;
}
