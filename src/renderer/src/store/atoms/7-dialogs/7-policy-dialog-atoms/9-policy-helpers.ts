import { FieldTyp, Meta } from "@/store/manifest";

export enum PolicyAction {
    add,     // 'Add',
    edit,    // 'Edit',
    na,      // 'n/a',
}

export function getPolicyExplanation(policy: string | undefined, policy2: string | undefined, ftyp: FieldTyp): PolicyAction {
  
    if (!policy && !policy2) {

        if (ftyp === FieldTyp.psw) {
            return PolicyAction.add;
        }

        return PolicyAction.na;
    }

    return PolicyAction.edit;
}

export function getPolicyExplanationText(action: PolicyAction): string {
    switch (action) {
        case PolicyAction.add: return 'Add';
        case PolicyAction.edit: return 'Edit';
        case PolicyAction.na: return 'n/a';
    }
}
