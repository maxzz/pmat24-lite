import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp2Obj, fieldTyp4Str } from "pm-manifest";
import { getPolicyExplanation } from "./9-policy-helpers";

export namespace FieldConv {

    export type FieldForAtoms = {
        useIt: boolean;
        label: string;
        type: FieldTyp;
        valueLife: ValueLife;           // this includes value and valueAs
        dbname: string;                 //TODO: field guid from manifest or field catalog; fieldCat was a dbname duplicate
        policies: PoliciesForAtoms;
    };

    export type PoliciesForAtoms = {
        policy: string;
        policy2: string;
        explanation: string;
    };

    export type FieldAtoms = Prettify<Atomize<FieldForAtoms> & {
        maniField: Mani.Field;          // all fields from original to combine with fields from atoms to create new field
        fromFile: FieldForAtoms;        // original state to compare with
        changed: boolean;               // state from atoms is different from original state
    }
    >;

    /**
     * Fields that are used in this editor
     */
    export type ThisType = Pick<Mani.Field,
        | 'useit'
        | 'displayname'
        | 'type'
        | 'dbname'
        | 'value' // | 'choosevalue' - so far cannot be changed
        | 'policy'
        | 'policy2'
        | 'password'
        | 'askalways'
        | 'onetvalue'
    >;

    // Atoms

    export function forAtoms(field: Meta.Field): FieldForAtoms {
        const { useit, displayname } = field.mani;
        const valueLife = TransformValue.valueLife4Mani(field.mani);

        const policies: PoliciesForAtoms = {
            policy: field.mani.policy || '',
            policy2: field.mani.policy2 || '',
            explanation: getPolicyExplanation(field.mani.policy, field.mani.policy2),
        };

        !valueLife.value && (valueLife.value = "");     //TODO: cleanup all empty values to undefined when saving manifest
        !valueLife.isRef && (valueLife.isRef = false);  //TODO: cleanup all empty values to undefined when saving manifest

        const rv: FieldForAtoms = {
            useIt: !!useit,
            label: displayname || '',
            type: fieldTyp4Str(field.mani),
            valueLife,
            dbname: field.mani.dbname,
            policies: policies,
        };
        return rv;
    }

    export function toAtoms(initialState: FieldForAtoms, onChange: OnValueChangeAny): Atomize<FieldForAtoms> {
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

    export function fromAtoms(atoms: FieldAtoms, get: Getter, set: Setter): FieldForAtoms {
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

    // Comparison

    function theSameValue(from: ValueLife, to: ValueLife): boolean {
        const rv = (
            from.value === to.value &&
            from.valueAs === to.valueAs &&
            from.isRef === to.isRef
        );
        return rv;
    }

    function theSamePolicies(from: PoliciesForAtoms, to: PoliciesForAtoms): boolean {
        const rv = (
            from.policy === to.policy &&
            from.policy2 === to.policy2
        );
        return rv;
    }

    export function areTheSame(from: FieldForAtoms, to: FieldForAtoms): boolean {
        const rv = (
            from.useIt === to.useIt &&
            from.label === to.label &&
            from.type === to.type &&
            from.dbname === to.dbname &&
            theSameValue(from.valueLife, to.valueLife) &&
            from.valueLife.valueAs === to.valueLife.valueAs &&
            theSamePolicies(from.policies, to.policies)
        );
        return rv;
    }

    // Back to manifest

    export function forMani(from: FieldForAtoms): ThisType {
        const rv: ThisType = {
            useit: from.useIt,
            displayname: from.label,
            dbname: from.dbname,
            ...fieldTyp2Obj(from.type),
            policy: from.policies.policy,
            policy2: from.policies.policy2,
        };

        TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    } //TODO: filter out undefined values when saving manifest

}
