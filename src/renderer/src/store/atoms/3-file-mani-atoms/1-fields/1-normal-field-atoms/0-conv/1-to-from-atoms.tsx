import { type Getter, type Setter } from "jotai";
import { type Atomize, type OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { type Mani, type Meta, TransformValue, fieldTyp4Str } from "pm-manifest";
import { type NormalField } from "./9-types";

export function forAtoms(field: Meta.Field): NormalField.FieldForAtoms {
    const maniField = field.mani;
    const { useit, displayname } = maniField;

    const valueLife = TransformValue.valueLife4Mani(maniField);

    !valueLife.value && (valueLife.value = "");     //TODO: cleanup all empty values to undefined when saving manifest
    !valueLife.isRef && (valueLife.isRef = false);  //TODO: cleanup all empty values to undefined when saving manifest

    const policies: Mani.FieldPolicy = {
        policy: maniField.policy || '',
        policy2: maniField.policy2 || '',
        options: maniField.options || '',
    };

    const rv: NormalField.FieldForAtoms = {
        useIt: !!useit,
        label: displayname || '',
        type: fieldTyp4Str(maniField),
        valueLife,
        dbname: maniField.dbname,
        policies: policies,
    };
    return rv;
}

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
