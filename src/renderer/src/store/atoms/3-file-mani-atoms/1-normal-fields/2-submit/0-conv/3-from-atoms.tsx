import { type Getter, type Setter } from "jotai";
import { type SubmitFields } from "./9-types";

export function fromAtoms(atoms: SubmitFields.SubmitAtoms, get: Getter, set: Setter): SubmitFields.ForAtoms {
    const { buttonNameItemsAtom, selectedAtom, doSubmitAtom, isSubmitTypeUndefinedAtom } = atoms;

    const rv = {
        buttonNameItems: get(buttonNameItemsAtom),
        selected: get(selectedAtom),
        doSubmit: get(doSubmitAtom),
        isSubmitTypeUndefined: get(isSubmitTypeUndefinedAtom),
    };
    
    return rv;
}
