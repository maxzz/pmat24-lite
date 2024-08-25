import { type Atomize, type OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { type NormalField } from "./9-types";

export function createAtoms(initialState: NormalField.FieldForAtoms, onChange: OnValueChangeAny): Atomize<NormalField.FieldForAtoms> {
    const { useIt, label, type, dbname, valueLife, policies } = initialState;
    return {
        useItAtom: atomWithCallback(useIt, onChange),
        labelAtom: atomWithCallback(label, onChange),
        typeAtom: atomWithCallback(type, onChange),
        valueLifeAtom: atomWithCallback(valueLife, onChange),
        dbnameAtom: atomWithCallback(dbname, onChange),
        policiesAtom: atomWithCallback(policies, onChange),
    };
}
