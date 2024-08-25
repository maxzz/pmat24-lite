import { type Getter, type Setter } from "jotai";
import { type Atomize, type OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { type Mani, Poli, namesConstrainSet } from "pm-manifest";
import { policyFromStrings, policyToStrings } from "@/store/manifest";
import { type RowInputState, initForInput, validateMaxLen, validateMinLen } from "@/ui";
import { type PolicyParser } from "@/store/manifest/3-policy-io";
import { PolicyDlgTypes } from "./9-types";

// Inital policy

const initialForAtoms: PolicyDlgTypes.ForAtoms = {
    enabled: false,
    constrainSet: `${Poli.ConstrainSet.withspecial}`,
    constrainSet0: `${Poli.ConstrainSet.withspecial}`,
    isCustom: false,
    custom: '',
    minLen: initForInput('8', { type: 'number' }),
    maxLen: initForInput('12', { type: 'number' }),
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
            minLen: initForInput(`${policy.minLen}`, { type: 'number', validate: validateMinLen, }),
            maxLen: initForInput(`${policy.maxLen}`, { type: 'number', validate: validateMaxLen, }),
            constrainPsw: `${policy.constrainPsw}`,
            useAs: `${policy.useAs}`,
            fakeOptions: policies.options,
        };
        return rv;
    }

    return initialForAtoms;
}
