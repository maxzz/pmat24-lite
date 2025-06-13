import { type EditorField, TransformValue, fieldTyp2Obj } from "@/store/manifest";

// Back to manifest

export function forMani(from: EditorField.ForAtoms): EditorField.Members {

    const rv: EditorField.Members = {
        useit: from.useIt,
        displayname: from.label,
        dbname: from.dbname,
        ...fieldTyp2Obj(from.type),
        policy: from.policies.policy,
        policy2: from.policies.policy2,
        options: from.policies.options,

        rfield: from.rfield as 'in' | 'out' | undefined,
        rfieldindex: from.rfieldUuid, //TODO: should be converted to index number
        rfieldform: from.rfieldForm,
    };

    TransformValue.valueLife2Mani(from.valueLife, rv);

    return rv;
}
