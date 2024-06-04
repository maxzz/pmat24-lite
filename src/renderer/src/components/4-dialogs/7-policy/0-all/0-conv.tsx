import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Mani, Poli, namesConstrainPsw, namesConstrainSet } from "pm-manifest";
import { policyFromStrings, policyToStrings } from "@/store/manifest";

export namespace PolicyDlgConv {

    export type ForAtoms = {
        enabled: boolean;               // Enable password policy

        constrainSet: string;           // ConstrainSet; predefined rule
        custom: string;                 // customRule

        minLen: number;                 // min password length
        maxLen: number;                 // max password length

        textVerify: string;             // text to verify policy
        textGenerate: string;           // text to verify policy generation

        constrainPsw: string;           // ConstrainsPsw

        useAs: string;                  // UseAs; by user / by system
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
        custom: '',
        minLen: 8,
        maxLen: 12,
        textVerify: '',
        textGenerate: '',
        constrainPsw: `${Poli.ConstrainPsw.diffAp}`,
        useAs: `${Poli.UseAs.verify}`,
    };

    // Atoms

    export function forAtoms(policies: Mani.FieldPolicy): ForAtoms {
        const policy = policyFromStrings(policies.policy, policies.policy2, policies.options);

        const hasPolicy = policy.useAs !== Poli.UseAs.none;
        if (hasPolicy) {
            const rv: ForAtoms = {
                ...initialForAtoms,
                enabled: hasPolicy,
                constrainSet: `${policy.constrainSet}`,
                custom: policy.custom,
                minLen: policy.minLen,
                maxLen: policy.maxLen,
                textVerify: 'TODO: short policy explanation',
                textGenerate: 'TODO: short policy explanation',
                constrainPsw: `${policy.constrainPsw}`,
                useAs: `${policy.useAs}`,
            };
            return rv;
        }

        return initialForAtoms;
    }

    export function toAtoms(initialState: ForAtoms, onChange: OnValueChangeAny): Atomize<ForAtoms> {
        const { enabled, constrainSet, custom, minLen: minLength, maxLen: maxLength, textVerify, textGenerate, constrainPsw: constrainsPsw, useAs } = initialState;
        const rv: Atomize<ForAtoms> = {
            enabledAtom: atomWithCallback(enabled, onChange),
            constrainSetAtom: atomWithCallback(constrainSet, onChange),
            customAtom: atomWithCallback(custom, onChange),
            minLenAtom: atomWithCallback(minLength, onChange),
            maxLenAtom: atomWithCallback(maxLength, onChange),
            textVerifyAtom: atomWithCallback(textVerify, onChange),
            textGenerateAtom: atomWithCallback(textGenerate, onChange),
            constrainPswAtom: atomWithCallback(constrainsPsw, onChange),
            useAsAtom: atomWithCallback(useAs, onChange),
        };
        return rv;
    }

    export function fromAtoms(atoms: PolicyUiAtoms, get: Getter, set: Setter): ForAtoms {
        const rv: ForAtoms = {
            enabled: get(atoms.enabledAtom),
            constrainSet: get(atoms.constrainSetAtom),
            custom: get(atoms.customAtom),
            minLen: get(atoms.minLenAtom),
            maxLen: get(atoms.maxLenAtom),
            textVerify: get(atoms.textVerifyAtom),
            textGenerate: get(atoms.textGenerateAtom),
            constrainPsw: get(atoms.constrainPswAtom),
            useAs: get(atoms.useAsAtom),
        };
        return rv;
    }

    // Comparison

    export function areTheSame(from: ForAtoms, to: ForAtoms): boolean {
        const rv = (
            from.enabled === to.enabled &&
            from.constrainSet === to.constrainSet &&
            from.custom === to.custom &&
            from.minLen === to.minLen &&
            from.maxLen === to.maxLen &&
            from.textVerify === to.textVerify &&
            from.textGenerate === to.textGenerate &&
            from.constrainPsw === to.constrainPsw &&
            from.useAs === to.useAs
        );
        return rv;
    }

    // Back to manifest

    function constrainSetIdxStrToType(idxStr: string): Poli.ConstrainSet {
        const idx = +idxStr;
        const isLast = idx >= namesConstrainSet.length - 1;
        if (isLast) {
            return Poli.ConstrainSet.atleastonenumber;
        }
        return idx as Poli.ConstrainSet;
    }

    function constrainPswIdxStrToType(idxStr: string): Poli.ConstrainPsw {
        return +idxStr as Poli.ConstrainPsw;
    }

    export function forMani(from: ForAtoms): Mani.FieldPolicySome {

        const policy: Poli.Policy = {
            useAs: !from.enabled
                ? Poli.UseAs.none
                : from.useAs === '0'
                    ? Poli.UseAs.none
                    : from.useAs === '1'
                        ? Poli.UseAs.verify
                        : Poli.UseAs.generate,
            minLen: from.minLen,
            maxLen: from.maxLen,
            constrainSet: constrainSetIdxStrToType(from.constrainSet),
            constrainPsw: constrainPswIdxStrToType(from.constrainPsw),
            custom: from.custom,
        };

        const rv: Mani.FieldPolicySome = policyToStrings(policy);
        return rv;
    }

}
