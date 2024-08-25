import { type Mani, type Meta, TransformValue, fieldTyp4Str } from "pm-manifest";
import { type NormalField } from "./9-types";

export function forAtoms(metaField: Meta.Field): NormalField.ForAtoms {
    const maniField = metaField.mani;
    const { useit, displayname } = maniField;

    const valueLife = TransformValue.valueLife4Mani(maniField);

    !valueLife.value && (valueLife.value = "");     //TODO: cleanup all empty values to undefined when saving manifest
    !valueLife.isRef && (valueLife.isRef = false);  //TODO: cleanup all empty values to undefined when saving manifest

    const policies: Mani.FieldPolicy = {
        policy: maniField.policy || '',
        policy2: maniField.policy2 || '',
        options: maniField.options || '',
    };

    const rv: NormalField.ForAtoms = {
        useIt: !!useit,
        label: displayname || '',
        type: fieldTyp4Str(maniField),
        valueLife,
        dbname: maniField.dbname,
        policies: policies,
    };
    return rv;
}
