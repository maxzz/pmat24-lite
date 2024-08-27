import { TransformValue, fieldTyp2Obj } from "pm-manifest";
import { type NormalField } from "./9-types";

// Back to manifest

export function forMani(from: NormalField.ForAtoms): NormalField.ThisType {

    const rv: NormalField.ThisType = {
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
