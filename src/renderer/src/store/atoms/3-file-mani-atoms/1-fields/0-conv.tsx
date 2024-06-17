import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp2Obj, fieldTyp4Str } from "pm-manifest";

export namespace FieldConv {

    export type FieldForAtoms = {
        useIt: boolean;
        label: string;
        type: FieldTyp;
        valueLife: ValueLife;           // this includes value and valueAs
        dbname: string;                 //TODO: field guid from manifest or field catalog; fieldCat was a dbname duplicate
        policies: Mani.FieldPolicy;
    };

    export type FieldAtoms = Prettify<Atomize<FieldForAtoms> & {
        metaField: Meta.Field;          // all fields from original to combine with fields from atoms to create new field
        fromFile: FieldForAtoms;        // original state to compare with
        changed: boolean;               // state from atoms is different from original state
    }>;

    /**
     * Fields that are used in this editor
     */
    export type ThisType = Pick<Mani.Field,
        | 'useit'
        | 'displayname'
        | 'type'
        | 'dbname'
        | 'value' // | 'choosevalue' - so far cannot be changed
        | 'password'
        | 'askalways'
        | 'onetvalue'
        | 'policy'
        | 'policy2'
        | 'options'
    >;

    // Atoms

    export function forAtoms(field: Meta.Field): FieldForAtoms {
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

        const rv: FieldForAtoms = {
            useIt: !!useit,
            label: displayname || '',
            type: fieldTyp4Str(maniField),
            valueLife,
            dbname: maniField.dbname,
            policies: policies,
        };
        return rv;
    }

    export function createAtoms(initialState: FieldForAtoms, onChange: OnValueChangeAny): Atomize<FieldForAtoms> {
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

    function theSamePolicyStrings(from: Mani.FieldPolicy, to: Mani.FieldPolicy): boolean {
        const rv = (
            from.policy === to.policy &&
            from.policy2 === to.policy2 &&
            from.options === to.options
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
            theSamePolicyStrings(from.policies, to.policies)
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
            options: from.policies.options,
        };

        TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    }

    export function forManiClean(from: ThisType): ThisType {
        const rv: ThisType = {
            ...(from.useit && { useit: true }),
            displayname: from.displayname,
            dbname: from.dbname,
            type: from.type,
            password: from.password,

            // ...fieldTyp2Obj(from.type),
            // policy: from.policies.policy,
            // policy2: from.policies.policy2,
            // options: from.policies.options,
        };

        // TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    }
}

//TODO: filter out undefined values when saving manifest
//TODO: we need to correlate policies with password change form

namespace FileMani {                    // This is a file structure wo/ boolean values
    export type FieldValueValue = {
        value?: string;
        choosevalue?: string;           // This does not exist in field catalog yet but we can added it to field catalog (as 2023 extension).
        password?: '1',                 // In file it's undefined | '1'. Only field catalog or manual mode can change this value.
        askalways?: '1',                // In file it's undefined | '1'.
        onetvalue?: '1',                // In file it's undefined | '1'.
    };

    export type FieldValueIds = {
        displayname?: string,           // It should be '' (in momory) if undefined and empty won't be stored in file (for localization). In filed catalog this is "dispname" and is required so we mark it here as required as well.
        dbname: string;
        ownernote?: string;             // This is not stored in Field and may appear in Field Catalog only.
    };

    export type FieldValue = FieldValueValue & FieldValueIds;

    export type FieldPolicySome = {
        policy?: string;                // This is standard rule: "[p4]g:8:8:withspecial:different_ap"
        policy2?: string;               // This is custom rule like: "[e1]g:(a{4,4}d{2,2}A{1,1}[@#$%!]{1,1})&lt;8,8&gt;"; both can present at the same time. It's defined in file, but not in c++.
        options?: string;               // see FieldPolicyOptions type
    };

    export type FieldDirection = {
        rfield?: 'in' | 'out';
        rfieldindex?: number;           // "2"
        rfieldform?: string;            // refs from login form
    };

    export type Field = FieldValue & FieldPolicySome & FieldDirection & {
        type: Mani.FieldTypeStr;        // This does not exist in field catalog

        path_ext?: string;              // path to this control with accessiblity info if exists

        submit?: '1',                   // "1"
        useit?: '1',                    // "1"

        controltosubmitdata?: '1';
        ids?: string;
    };
}
