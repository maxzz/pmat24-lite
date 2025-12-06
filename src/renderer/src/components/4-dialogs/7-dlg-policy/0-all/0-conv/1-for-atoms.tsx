import { type Mani, Poli, nameValuesConstrainSet, namesConstrainSet } from "@/store/8-manifest";
import { type PolicyDlgTypes } from "./9-types";
import { policyFromStrings } from "@/store/8-manifest";
import { initRowInputState, validateMaxLen, validateMinLen } from "@/ui/local-ui";

// Inital policy

const initialForAtoms: PolicyDlgTypes.ForAtoms = {
    enabled: false,
    constrainSet: `${nameValuesConstrainSet.length}`, //`${Poli.ConstrainSet.withspecial}`, // now we use custom rule
    constrainSet0: `${nameValuesConstrainSet.length}`, //`${Poli.ConstrainSet.withspecial}`, // now we use custom rule
    isCustom: true,
    custom: '(A{1,}s{1,}d{1,}a{5,})',
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

//export const chSetRuleNames = [...namesConstrainSet, 'Use custom rule'];
export const chSetRuleNameValues: (readonly [string, string])[] = [...nameValuesConstrainSet, ['Use custom rule', `${nameValuesConstrainSet.length}`]];

export function forAtoms(policies: Mani.FieldPolicy): PolicyDlgTypes.ForAtoms {
    const policy = policyFromStrings(policies.policy, policies.policy2, policies.options);

    const hasPolicy = policy.useAs !== Poli.UseAs.none;
    const isCustom = policy.custom !== '';

    if (hasPolicy) {
        const rv: PolicyDlgTypes.ForAtoms = {
            ...initialForAtoms,
            enabled: hasPolicy,
            constrainSet: isCustom ? `${chSetRuleNameValues.length - 1}` : `${policy.constrainSet}`,
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
