import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Mani, Poli } from "pm-manifest";

export namespace PolicyDlgConv {

    export type ForAtoms = {
        enabled: boolean;               // Enable password policy
        isCustomRule: '0' | '1';        // boolean; rule type: predefined or custom rule

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

    const initialPolicy: ForAtoms = {
        enabled: true,
        isCustomRule: '0',
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
        //TODO: create the default policy but dissabled initially
        //TODO: parse policies and assign to rv

        //TODO: parse policy and assign onChange callback
        // const policy = policies.policy || policies.policy2;

        const rv: ForAtoms = initialPolicy;
        return rv;
    }

    export function toAtoms(initialState: ForAtoms, onChange: OnValueChangeAny): Atomize<ForAtoms> {
        const { enabled, isCustomRule, constrainSet, custom, minLen: minLength, maxLen: maxLength, textVerify, textGenerate, constrainPsw: constrainsPsw, useAs } = initialState;
        const rv: Atomize<ForAtoms> = {
            enabledAtom: atomWithCallback(enabled, onChange),
            isCustomRuleAtom: atomWithCallback(isCustomRule, onChange),
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
            isCustomRule: get(atoms.isCustomRuleAtom),
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
            from.isCustomRule === to.isCustomRule &&
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

    /** /
    export function forMani(from: PolicyForAtoms, metaForm: Meta.Form) {
        const rv: ThisType = {
            useit: from.useIt,
            displayname: from.label,
            dbname: from.dbname,
            ...fieldTyp2Obj(from.type),
        };
    
        TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    }
    /**/

}
