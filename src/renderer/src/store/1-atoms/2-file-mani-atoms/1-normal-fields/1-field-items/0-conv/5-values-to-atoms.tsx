import { type Getter, type Setter } from "jotai";
import { EditorField } from "@/store/manifest";
import { Atomize } from "@/utils";

export function valuesToAtoms(values: EditorField.ForAtoms, atoms: Atomize<EditorField.ForAtoms>, get: Getter, set: Setter): void {
    set(atoms.useItAtom, values.useIt);
    set(atoms.labelAtom, values.label);
    set(atoms.typeAtom, values.type);
    set(atoms.dbnameAtom, values.dbname);
    set(atoms.valueLifeAtom, values.valueLife);
    set(atoms.policiesAtom, values.policies);

    set(atoms.rfieldAtom, values.rfield);
    set(atoms.rfieldUuidAtom, values.rfieldUuid);
    set(atoms.rfieldFormAtom, values.rfieldForm);
}
