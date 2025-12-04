import { FieldTyp, Meta } from "@/store/8-manifest";

export enum PolicyAction {
    add,     // 'Add',
    edit,    // 'Edit',
    hide,    // 'n/a',
}

export function getPolicyExplanation(policy: string | undefined, policy2: string | undefined, ftyp: FieldTyp): PolicyAction {
  
    if (!policy && !policy2) {

        if (ftyp === FieldTyp.psw) {
            return PolicyAction.add;
        }

        return PolicyAction.hide;
    }

    return PolicyAction.edit;
}

export function getPolicyBtnText(action: PolicyAction): string {
    switch (action) {
        case PolicyAction.add: return 'Add';
        case PolicyAction.edit: return 'Edit';
        case PolicyAction.hide: return 'n/a';
    }
}
