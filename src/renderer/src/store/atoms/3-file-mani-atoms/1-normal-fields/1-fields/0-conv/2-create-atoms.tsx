import { type Atomize, type OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { type NormalField } from "./9-types";

export function createAtoms(initialState: NormalField.ForAtoms, onChange: OnValueChangeAny): Atomize<NormalField.ForAtoms> {
    const { useIt, label, type, dbname, valueLife, policies } = initialState;

    const rv: Atomize<NormalField.ForAtoms> = {
        useItAtom: atomWithCallback(useIt, onChange),
        labelAtom: atomWithCallback(label, onChange),
        typeAtom: atomWithCallback(type, onChange),
        valueLifeAtom: atomWithCallback(valueLife, onChange),
        dbnameAtom: atomWithCallback(dbname, onChange),
        policiesAtom: atomWithCallback(policies, onChange),
    };

    return rv;
}
