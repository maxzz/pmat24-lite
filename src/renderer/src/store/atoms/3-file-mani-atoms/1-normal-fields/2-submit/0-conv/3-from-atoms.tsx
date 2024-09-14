import { type Getter, type Setter } from "jotai";
import { type SubmitConvTypes } from "./9-types";

export function fromAtoms(atoms: SubmitConvTypes.SubmitAtoms, get: Getter, set: Setter): SubmitConvTypes.SubmitForAtoms {
    const { buttonNameItemsAtom, selectedAtom, doSubmitAtom, isDoSubmitUndefinedAtom } = atoms;

    const rv = {
        buttonNameItems: get(buttonNameItemsAtom),
        selected: get(selectedAtom),
        doSubmit: get(doSubmitAtom),
        isDoSubmitUndefined: get(isDoSubmitUndefinedAtom),
    };
    
    return rv;
}
