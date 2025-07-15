import { type Getter, type Setter } from "jotai";
import { type SubmitFieldTypes } from "./9-types";

export function fromAtoms(atoms: SubmitFieldTypes.Ctx, get: Getter, set: Setter): SubmitFieldTypes.ForAtoms {
    const { buttonNameItemsAtom, selectedAtom, doSubmitAtom, isSubmitTypeUndefinedAtom } = atoms;

    const rv = {
        buttonNameItems: get(buttonNameItemsAtom),
        selected: get(selectedAtom),
        doSubmit: get(doSubmitAtom),
        isSubmitTypeUndefined: get(isSubmitTypeUndefinedAtom),
    };
    
    return rv;
}
