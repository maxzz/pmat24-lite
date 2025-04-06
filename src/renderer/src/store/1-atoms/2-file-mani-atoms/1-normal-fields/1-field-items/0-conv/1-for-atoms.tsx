// import { type NormalField, type Mani, type Meta, TransformValue, fieldTyp4Str } from "@/store/manifest";

// export function forAtoms(maniField: Mani.Field): EditorField.ForAtoms {
//     const { useit, displayname } = maniField;

//     const valueLife = TransformValue.valueLife4Mani(maniField);

//     !valueLife.value && (valueLife.value = "");     //TODO: cleanup all empty values to undefined when saving manifest
//     !valueLife.isRef && (valueLife.isRef = false);  //TODO: cleanup all empty values to undefined when saving manifest

//     const policies: Mani.FieldPolicy = {
//         policy: maniField.policy || '',
//         policy2: maniField.policy2 || '',
//         options: maniField.options || '',
//     };

//     const rv: EditorField.ForAtoms = {
//         useIt: !!useit,
//         label: displayname || '',
//         type: fieldTyp4Str(maniField),
//         valueLife,
//         dbname: maniField.dbname,
//         policies: policies,
//     };
//     return rv;
// }

// moved to pm-manifest as fieldForEditor()
