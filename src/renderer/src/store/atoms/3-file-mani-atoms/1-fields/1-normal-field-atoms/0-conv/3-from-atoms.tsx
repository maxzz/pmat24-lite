import { type Getter, type Setter } from "jotai";
import { type NormalField } from "./9-types";

export function fromAtoms(atoms: NormalField.FieldAtoms, get: Getter, set: Setter): NormalField.FieldForAtoms {
    const rv = {
        useIt: get(atoms.useItAtom),
        label: get(atoms.labelAtom),
        type: get(atoms.typeAtom),
        valueLife: get(atoms.valueLifeAtom),
        dbname: get(atoms.dbnameAtom),
        policies: get(atoms.policiesAtom),
    };
    return rv;
}
