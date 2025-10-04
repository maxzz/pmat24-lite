import { type Mani, Poli, namesConstrainSet } from "@/store/manifest";
import { type PolicyDlgTypes } from "./9-types";
import { policyFromStrings } from "@/store/manifest";
import { initRowInputState, validateMaxLen, validateMinLen } from "@/ui";

// Inital policy

const initialForAtoms: PolicyDlgTypes.ForAtoms = {
    enabled: false,
    constrainSet: `${Poli.ConstrainSet.withspecial}`,
    constrainSet0: `${Poli.ConstrainSet.withspecial}`,
    isCustom: false,
    custom: '',
    minLen: initRowInputState('8', { type: 'number' }),
    maxLen: initRowInputState('12', { type: 'number' }),
    explanation: '',
    errorText: '',
    testPassword: '',
    testVerified: '',
    constrainPsw: `${Poli.ConstrainPsw.diffAp}`,
    useAs: `${Poli.UseAs.verify}`,
    fakeOptions: '',
};

// Atoms

export const chSetRuleNames = [...namesConstrainSet, 'Use custom rule'];

export function forAtoms(policies: Mani.FieldPolicy): PolicyDlgTypes.ForAtoms {
    const policy = policyFromStrings(policies.policy, policies.policy2, policies.options);

    const hasPolicy = policy.useAs !== Poli.UseAs.none;
    const isCustom = policy.custom !== '';

    if (hasPolicy) {
        const rv: PolicyDlgTypes.ForAtoms = {
            ...initialForAtoms,
            enabled: hasPolicy,
            constrainSet: isCustom ? `${chSetRuleNames.length - 1}` : `${policy.constrainSet}`,
            constrainSet0: `${policy.constrainSet}`,
            isCustom: isCustom,
            custom: policy.custom,
            minLen: initRowInputState(`${policy.minLen}`, { type: 'number', validate: validateMinLen, }),
            maxLen: initRowInputState(`${policy.maxLen}`, { type: 'number', validate: validateMaxLen, }),
            constrainPsw: `${policy.constrainPsw}`,
            useAs: `${policy.useAs}`,
            fakeOptions: policies.options,
        };
        return rv;
    }

    return initialForAtoms;
}
