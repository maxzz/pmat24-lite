import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp2Obj, fieldTyp4Str } from "pm-manifest";
import { FileMani } from "@/store/manifest/1-file-mani";

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

    export function forFileMani(from: ThisType, metaField: Meta.Field): FileMani.Field {
        const maniField = metaField.mani;

        const rv: FileMani.Field = {
            ...(from.displayname && { displayname: from.displayname }),
            type: from.type,
            dbname: from.dbname,
            //...(maniField.pa)
            ...(maniField.path_ext && { path_ext: maniField.path_ext }),
            ...(from.askalways && { askalways: '1' }),
            ...(from.onetvalue && { onetvalue: '1' }),
            ...(from.policy && { policy: from.policy }),
            ...(from.policy2 && { policy2: from.policy2 }),
            ...(from.options && { options: from.options }),
            ...(from.password && { password: '1' }),
            ...(from.useit && { useit: '1' }),
        };
        return rv;
    }
}

//TODO: we need to correlate policies with password change form

/*
// Order is important to keep the same order as in manifest. see oti_manifest_io.h::save_field()
    out_begin(os, "<field");
        out(os, "displayname", field_.displayname);
        out(os, "type", internal_io::mapping::MAP_FIELD_TYPE::cast(field_.type));
        out(os, "dbname", field_.dbname);
        out(os, "path", oldPath_);
        out(os, "path_ext", field_.path);

        out(os, "policy", policyOld);
        out(os, "policy2", policyExt);
        out(os, "options", customRuleOptions);

        out(os, "value", textchars::low::remove_illegal(field_.value.memvalue));

        out(os, "choosevalue", textchars::low::remove_illegal(field_.value.choosevalue));

        out(os, "rfield", internal_io::mapping::MAP_RDIRECTION_TYPE::cast(field_.rdir));
        out(os, "rfieldform", internal_io::mapping::MAP_FORMNAME_TYPE::cast(field_.rfield.rmemid.form));
        out(os, "rfieldindex", internal_io::mapping::MAP_NUMBER_TYPE::cast(field_.rfield.rindex));

        out(os, "askalways", field_.value.askalways77);
        out(os, "onetvalue", field_.value.onetvalue77);
        out(os, "password", field_.password);
        out(os, "submit", field_.controltosubmitdata);
        out(os, "useit", field_.useit);

        out(os, "accid", strings::conv_int(field_.ids.accid));
    out_end(os);
*/
