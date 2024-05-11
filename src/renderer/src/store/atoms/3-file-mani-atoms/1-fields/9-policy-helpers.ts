import { FieldTyp, Meta } from "pm-manifest";

export enum PolicyAction {
    add,     // '<Add>',
    edit,    // '<Edit>',
    na,      // 'n/a',
}

export function getPolicyExplanation(policy: string | undefined, policy2: string | undefined, metaField: Meta.Field): PolicyAction {
  
    if (!policy && !policy2) {

        if (metaField.ftyp === FieldTyp.psw) {
            return PolicyAction.add;
        }

        return PolicyAction.na;
    }

    return PolicyAction.edit;
}
