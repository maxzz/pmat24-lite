import { type Atomize, type OnValueChangeAny, atomWithCallback } from "@/utils";
import { type SubmitFieldTypes } from "./9-types";

export function createAtoms(initialState: SubmitFieldTypes.ForAtoms, onChange: OnValueChangeAny): Atomize<SubmitFieldTypes.ForAtoms> {
    const { buttonNameItems, selected, doSubmit, isSubmitTypeUndefined } = initialState;

    const rv: Atomize<SubmitFieldTypes.ForAtoms> = {
        buttonNameItemsAtom: atomWithCallback(buttonNameItems, onChange),
        selectedAtom: atomWithCallback(selected, onChange),
        doSubmitAtom: atomWithCallback(doSubmit, onChange),
        isSubmitTypeUndefinedAtom: atomWithCallback(isSubmitTypeUndefined, onChange),
    };
    
    return rv;
}
