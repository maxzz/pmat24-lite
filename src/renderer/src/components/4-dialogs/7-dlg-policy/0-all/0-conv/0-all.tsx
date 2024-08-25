import { type Getter, type Setter } from "jotai";
import { type Atomize, type OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { type Mani, Poli, namesConstrainSet } from "pm-manifest";
import { policyFromStrings, policyToStrings } from "@/store/manifest";
import { type RowInputState, initForInput, validateMaxLen, validateMinLen } from "@/ui";
import { type PolicyParser } from "@/store/manifest/3-policy-io";
import { PolicyDlgTypes } from "./9-types";

export namespace PolicyDlgConv {

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

    export function createAtoms(initialState: PolicyDlgTypes.ForAtoms, onChange: OnValueChangeAny): Atomize<PolicyDlgTypes.ForAtoms> {
        const { enabled, constrainSet, custom, minLen, maxLen, explanation, testPassword, testVerified, constrainPsw, useAs } = initialState;
        const rv: Atomize<PolicyDlgTypes.ForAtoms> = {
            enabledAtom: atomWithCallback(enabled, onChange),
            constrainSetAtom: atomWithCallback(constrainSet, onChange),
            constrainSet0Atom: atomWithCallback(constrainSet, onChange),
            isCustomAtom: atomWithCallback(initialState.isCustom, onChange),
            customAtom: atomWithCallback(custom, onChange),
            minLenAtom: atomWithCallback(minLen, onChange),
            maxLenAtom: atomWithCallback(maxLen, onChange),
            explanationAtom: atomWithCallback(explanation, onChange),
            errorTextAtom: atomWithCallback(initialState.errorText, onChange),
            testPasswordAtom: atomWithCallback(testPassword, onChange),
            testVerifiedAtom: atomWithCallback(testVerified, onChange),
            constrainPswAtom: atomWithCallback(constrainPsw, onChange),
            useAsAtom: atomWithCallback(useAs, onChange),
            fakeOptionsAtom: atomWithCallback(initialState.fakeOptions, onChange),
        };
        return rv;
    }

    export function valuesToAtoms(values: PolicyDlgTypes.ForAtoms, atoms: PolicyDlgTypes.PolicyUiAtoms, get: Getter, set: Setter): void {
        set(atoms.enabledAtom, values.enabled);
        set(atoms.constrainSetAtom, values.constrainSet);
        set(atoms.constrainSet0Atom, values.constrainSet0);
        set(atoms.isCustomAtom, values.isCustom);
        set(atoms.customAtom, values.custom);
        set(atoms.minLenAtom, values.minLen);
        set(atoms.maxLenAtom, values.maxLen);
        set(atoms.explanationAtom, values.explanation);
        set(atoms.errorTextAtom, values.errorText);
        set(atoms.testPasswordAtom, values.testPassword);
        set(atoms.testVerifiedAtom, values.testVerified);
        set(atoms.constrainPswAtom, values.constrainPsw);
        set(atoms.useAsAtom, values.useAs);
        set(atoms.fakeOptionsAtom, values.fakeOptions);
    }

    export function fromAtoms(atoms: PolicyDlgTypes.PolicyUiAtoms, get: Getter, set: Setter): PolicyDlgTypes.ForAtoms {
        const rv: PolicyDlgTypes.ForAtoms = {
            enabled: get(atoms.enabledAtom),
            constrainSet: get(atoms.constrainSetAtom),
            constrainSet0: get(atoms.constrainSet0Atom),
            isCustom: get(atoms.isCustomAtom),
            custom: get(atoms.customAtom),
            minLen: get(atoms.minLenAtom),
            maxLen: get(atoms.maxLenAtom),
            explanation: get(atoms.explanationAtom),
            errorText: get(atoms.errorTextAtom),
            testPassword: get(atoms.testPasswordAtom),
            testVerified: get(atoms.testVerifiedAtom),
            constrainPsw: get(atoms.constrainPswAtom),
            useAs: get(atoms.useAsAtom),
            fakeOptions: get(atoms.fakeOptionsAtom),
        };
        return rv;
    }

    // Comparison

    export function areTheSame(from: PolicyDlgTypes.ForAtoms, to: PolicyDlgTypes.ForAtoms): boolean {
        const rv = (
            from.enabled === to.enabled &&
            from.constrainSet === to.constrainSet &&
            from.custom === to.custom &&
            from.minLen.data === to.minLen.data &&
            from.maxLen.data === to.maxLen.data &&
            from.constrainPsw === to.constrainPsw &&
            from.useAs === to.useAs &&
            from.fakeOptions === to.fakeOptions
        );
        return rv;
    }

    // Back to manifest

    export function forMani(from: PolicyDlgTypes.ForAtoms): Mani.FieldPolicy {

        const useAs = !from.enabled
            ? Poli.UseAs.none
            : from.useAs === '0'
                ? Poli.UseAs.none
                : from.useAs === '1'
                    ? Poli.UseAs.verify
                    : Poli.UseAs.generate;

        const constrainSet: Poli.ConstrainSet = from.isCustom ? +from.constrainSet0 : +from.constrainSet;
        const constrainPsw: Poli.ConstrainPsw = +from.constrainPsw;

        const policy: Poli.Policy = {
            useAs,
            minLen: +from.minLen.data,
            maxLen: +from.maxLen.data,
            constrainSet,
            constrainPsw,
            custom: from.custom,
        };

        const rv: Mani.FieldPolicy = policyToStrings(policy, from.fakeOptions);
        return rv;
    }

}
