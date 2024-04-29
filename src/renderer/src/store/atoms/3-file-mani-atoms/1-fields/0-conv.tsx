import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp2Obj, fieldTyp4Str } from "pm-manifest";

export namespace FieldConv {

    export type FieldForAtoms = {
        useIt: boolean;
        label: string;
        type: FieldTyp;
        valueLife: ValueLife;           // this includes value and valueAs
        fieldCat: string;
    };

    export type FieldAtoms = Prettify<
        & Atomize<FieldForAtoms>
        & {
            maniField: Mani.Field;      // all fields from original to combine with fields from atoms to create new field
            fromFile: FieldForAtoms;    // original state to compare with
            changed: boolean;           // state from atoms is different from original state
        }
    >;

    /**
     * Fields that are used in this editor
     */
    export type ThisType = Pick<Mani.Field,
        | 'useit'
        | 'displayname'
        | 'type'
        | 'value' // | 'choosevalue' - so far cannot be changed
        | 'password'
        | 'askalways'
        | 'onetvalue'
    >;

    //

    export function forAtoms(field: Meta.Field): FieldForAtoms {
        const { useit, displayname } = field.mani;
        const rv: FieldForAtoms = {
            useIt: !!useit,
            label: displayname || '',
            type: fieldTyp4Str(field.mani),
            valueLife: TransformValue.valueLife4Mani(field.mani),
            fieldCat: '', //TODO:
        };
        return rv;
    }

    export function forMani(from: FieldForAtoms): ThisType {
        const rv: ThisType = {
            useit: from.useIt,
            displayname: from.label,
            ...fieldTyp2Obj(from.type),
        };

        TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    }

    //

    export function toAtoms(initialState: FieldForAtoms, onChange: OnValueChangeAny): Atomize<FieldForAtoms> {
        const { useIt, label, type, valueLife, fieldCat } = initialState;
        return {
            useItAtom: atomWithCallback(useIt, onChange),
            labelAtom: atomWithCallback(label, onChange),
            typeAtom: atomWithCallback(type, onChange),
            valueLifeAtom: atomWithCallback(valueLife, onChange),
            fieldCatAtom: atomWithCallback(fieldCat, onChange), //TODO:
        };
    }

    export function fromAtoms(atoms: FieldAtoms, get: Getter, set: Setter): FieldForAtoms {
        const rv = {
            useIt: get(atoms.useItAtom),
            label: get(atoms.labelAtom),
            type: get(atoms.typeAtom),
            valueLife: get(atoms.valueLifeAtom),
            fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
        };
        return rv;
    }

    //

    export function areTheSame(from: FieldForAtoms, to: FieldForAtoms) {
        return from.useIt === to.useIt
            && from.label === to.label
            && from.type === to.type
            && from.valueLife.value === to.valueLife.value
            && from.valueLife.valueAs === to.valueLife.valueAs;
    }
}
