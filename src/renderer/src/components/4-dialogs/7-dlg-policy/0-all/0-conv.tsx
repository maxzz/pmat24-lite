import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Mani, Poli, namesConstrainSet } from "pm-manifest";
import { policyFromStrings, policyToStrings } from "@/store/manifest";
import { RowInputState } from "@/store/atoms/3-file-mani-atoms/4-options/19-types";
import { initForInput } from "@/store/atoms/3-file-mani-atoms/4-options/0-conv/2-atom-helpers";

export namespace PolicyDlgConv {

    export type ForAtoms = {
        enabled: boolean;               // Enable password policy

        constrainSet: string;           // ConstrainSet; predefined rule
        constrainSet0: string;          // ui helper field: last ConstrainSet in case if custom is selected
        isCustom: boolean;              // ui helper field: is custom rule selected but custom field can be empty
        custom: string;                 // customRule

        minLen: RowInputState;          // min password length
        maxLen: RowInputState;          // max password length

        explanation: string;            // explanation of policy
        textVerify: string;             // text to verify policy
        textGenerate: string;           // text to verify policy generation

        constrainPsw: string;           // ConstrainsPsw

        useAs: string;                  // UseAs; by user / by system

        fakeOptions: string;            // Fake options from manifest but not used, so we just preserve it
    };

    export type PolicyUiAtoms = Prettify<Atomize<ForAtoms> & {
        original: Mani.FieldPolicy;     // original state to allow on/off checkbox
        fromFile: ForAtoms;             // original state to compare with
        changed: boolean;               // state from atoms is different from original state
    }>;

    // Inital policy

    const initialForAtoms: ForAtoms = {
        enabled: false,
        constrainSet: `${Poli.ConstrainSet.withspecial}`,
        constrainSet0: `${Poli.ConstrainSet.withspecial}`,
        isCustom: false,
        custom: '',
        minLen: initForInput('8', { type: 'number' }),
        maxLen: initForInput('12', { type: 'number' }),
        explanation: '',
        textVerify: '',
        textGenerate: '',
        constrainPsw: `${Poli.ConstrainPsw.diffAp}`,
        useAs: `${Poli.UseAs.verify}`,
        fakeOptions: '',
    };

    // Atoms

    export const chSetRuleNames = [...namesConstrainSet, 'Use custom rule'];

    function validateMinLen(value: string) {
        const num = parseInt(value, 10);
        if (isNaN(num)) {
            return 'Value must be a number.';
        }
        return num < 4 ? 'Min password length must be more than 4' : '';
    }

    function validateMaxLen(value: string) {
        const num = parseInt(value, 10);
        if (isNaN(num)) {
            return 'Value must be a number.';
        }
        return num < 4 ? 'Max password length must be more than 4' : '';
    }
    //TODO: when isCustom assume initial values are correct
    //TODO: length may be missing from custom rule

    export function forAtoms(policies: Mani.FieldPolicy): ForAtoms {
        const policy = policyFromStrings(policies.policy, policies.policy2, policies.options);

        const hasPolicy = policy.useAs !== Poli.UseAs.none;
        const isCustom = policy.custom !== '';

        if (hasPolicy) {
            const rv: ForAtoms = {
                ...initialForAtoms,
                enabled: hasPolicy,
                constrainSet: isCustom ? `${chSetRuleNames.length - 1}` : `${policy.constrainSet}`,
                constrainSet0: `${policy.constrainSet}`,
                isCustom: isCustom,
                custom: policy.custom,
                minLen: initForInput(`${policy.minLen}`, { type: 'number', validate: validateMinLen, }),
                maxLen: initForInput(`${policy.maxLen}`, { type: 'number', validate: validateMaxLen, }),
                explanation: '',
                textVerify: 'TODO: short policy explanation',
                textGenerate: 'TODO: short policy explanation',
                constrainPsw: `${policy.constrainPsw}`,
                useAs: `${policy.useAs}`,
                fakeOptions: policies.options,
            };
            return rv;
        }

        return initialForAtoms;
    }

    export function createAtoms(initialState: ForAtoms, onChange: OnValueChangeAny): Atomize<ForAtoms> {
        const { enabled, constrainSet, custom, minLen, maxLen, explanation, textVerify, textGenerate, constrainPsw, useAs } = initialState;
        const rv: Atomize<ForAtoms> = {
            enabledAtom: atomWithCallback(enabled, onChange),
            constrainSetAtom: atomWithCallback(constrainSet, onChange),
            constrainSet0Atom: atomWithCallback(constrainSet, onChange),
            isCustomAtom: atomWithCallback(initialState.isCustom, onChange),
            customAtom: atomWithCallback(custom, onChange),
            minLenAtom: atomWithCallback(minLen, onChange),
            maxLenAtom: atomWithCallback(maxLen, onChange),
            explanationAtom: atomWithCallback(explanation, onChange),
            textVerifyAtom: atomWithCallback(textVerify, onChange),
            textGenerateAtom: atomWithCallback(textGenerate, onChange),
            constrainPswAtom: atomWithCallback(constrainPsw, onChange),
            useAsAtom: atomWithCallback(useAs, onChange),
            fakeOptionsAtom: atomWithCallback(initialState.fakeOptions, onChange),
        };
        return rv;
    }

    export function fromAtoms(atoms: PolicyUiAtoms, get: Getter, set: Setter): ForAtoms {
        const rv: ForAtoms = {
            enabled: get(atoms.enabledAtom),
            constrainSet: get(atoms.constrainSetAtom),
            constrainSet0: get(atoms.constrainSet0Atom),
            isCustom: get(atoms.isCustomAtom),
            custom: get(atoms.customAtom),
            minLen: get(atoms.minLenAtom),
            maxLen: get(atoms.maxLenAtom),
            explanation: get(atoms.explanationAtom),
            textVerify: get(atoms.textVerifyAtom),
            textGenerate: get(atoms.textGenerateAtom),
            constrainPsw: get(atoms.constrainPswAtom),
            useAs: get(atoms.useAsAtom),
            fakeOptions: get(atoms.fakeOptionsAtom),
        };
        return rv;
    }

    // Comparison

    export function areTheSame(from: ForAtoms, to: ForAtoms): boolean {
        const rv = (
            from.enabled === to.enabled &&
            from.constrainSet === to.constrainSet &&
            from.custom === to.custom &&
            from.minLen.data === to.minLen.data &&
            from.maxLen.data === to.maxLen.data &&
            from.textVerify === to.textVerify &&
            from.textGenerate === to.textGenerate &&
            from.constrainPsw === to.constrainPsw &&
            from.useAs === to.useAs &&
            from.fakeOptions === to.fakeOptions
        );
        return rv;
    }

    // Back to manifest

    export function forMani(from: ForAtoms): Mani.FieldPolicy {

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
