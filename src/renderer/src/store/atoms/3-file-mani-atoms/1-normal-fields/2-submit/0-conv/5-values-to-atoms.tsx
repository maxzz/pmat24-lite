import { type Getter, type Setter } from "jotai";
import { SubmitFields } from "./9-types";

export function valuesToAtoms(values: SubmitFields.ForAtoms, atoms: SubmitFields.ForAtomsAtomized, get: Getter, set: Setter): void {
    set(atoms.buttonNameItemsAtom, values.buttonNameItems);
    set(atoms.selectedAtom, values.selected);
    set(atoms.doSubmitAtom, values.doSubmit);
    set(atoms.isSubmitTypeUndefinedAtom, values.isSubmitTypeUndefined);
}
